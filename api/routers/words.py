from fastapi import APIRouter, Depends, Query, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select
from sqlalchemy import text
from ..database import get_session
from ..models import WordStatusType, Word, UserWordStatus, User, Diary

from typing import Optional

router = APIRouter(prefix="/words", tags=["Words"])

class WordStatusUpdateRequest(BaseModel):
    wordId: str
    status: WordStatusType

@router.get("/review")
def get_words_review(
    subject: Optional[str] = Query(None),
    session: Session = Depends(get_session)
):
    try:
        user = session.exec(select(User)).first()

        # DB 서버 기준 NOW() - 24h 사용 (raw text) → Python/Vercel 타임존 불일치 문제 완전 방지
        # 방법 확인: text("words.created_at >= NOW() - INTERVAL '24 hours'")
        query = select(Word, Diary).join(Diary, Word.diary_id == Diary.id).where(
            text("words.created_at >= NOW() - INTERVAL '24 hours'")
        )

        if subject:
            query = query.where(Diary.subject == subject)

        if user:
            # Exclude words marked as 'KNOW' by this user
            subq = select(UserWordStatus.word_id).where(
                UserWordStatus.user_id == user.id,
                UserWordStatus.status == WordStatusType.KNOW
            )
            query = query.where(Word.id.notin_(subq))

        query = query.order_by(Word.created_at.desc())
        results = session.exec(query).all()

        return {
            "success": True,
            "data": [
                {
                    "wordId": str(word.id),
                    "diaryId": str(diary.id),
                    "subject": diary.subject.value if hasattr(diary.subject, 'value') else diary.subject,
                    "word": word.word,
                    "reading": word.reading or "",  # 한어병음 또는 히라가나
                    "meaning": word.meaning,
                    "exampleSentence": word.example_sentence
                } for word, diary in results
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/status")
def update_word_status(
    request: WordStatusUpdateRequest,
    session: Session = Depends(get_session)
):
    try:
        # Dummy user (since auth is not fully implemented)
        user = session.exec(select(User)).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        existing = session.exec(select(UserWordStatus).where(
            UserWordStatus.user_id == user.id,
            UserWordStatus.word_id == request.wordId
        )).first()
        
        if existing:
            existing.status = request.status
        else:
            new_status = UserWordStatus(
                user_id=user.id,
                word_id=request.wordId,
                status=request.status
            )
            session.add(new_status)
        session.commit()
        
        return {
            "success": True,
            "message": "Word status updated successfully."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
