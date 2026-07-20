from fastapi import APIRouter, Depends, Query, HTTPException, Path
from sqlmodel import Session, select
from typing import Optional
import uuid
from ..database import get_session
from ..models import Diary, Word, Quiz, UserWordStatus, QuizAttempt

router = APIRouter(prefix="/diaries", tags=["Diaries"])

@router.get("")
def get_diaries(
    subject: Optional[str] = Query(None),
    session: Session = Depends(get_session)
):
    try:
        query = select(Diary).order_by(Diary.created_at.desc())
        if subject:
            query = query.where(Diary.subject == subject)
        
        diaries = session.exec(query).all()
        
        return {
            "success": True,
            "data": [
                {
                    "id": str(d.id),
                    "subject": d.subject.value if hasattr(d.subject, 'value') else d.subject,
                    "date": d.date.strftime("%Y.%m.%d") if hasattr(d.date, 'strftime') else str(d.date),
                    "contentSnippet": d.content_snippet,
                    "fullText": d.full_text,
                    "isNew": d.is_new
                } for d in diaries
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{diary_id}")
def delete_diary(
    diary_id: uuid.UUID = Path(...),
    session: Session = Depends(get_session)
):
    try:
        # 1. 다이어리 찾기
        diary = session.get(Diary, diary_id)
        if not diary:
            raise HTTPException(status_code=404, detail="Diary not found")
            
        # 2. 다이어리에 속한 단어(Word)와 연관된 상태(UserWordStatus) 삭제
        words = session.exec(select(Word).where(Word.diary_id == diary_id)).all()
        for word in words:
            statuses = session.exec(select(UserWordStatus).where(UserWordStatus.word_id == word.id)).all()
            for status in statuses:
                session.delete(status)
            session.delete(word)

        # 3. 다이어리에 속한 퀴즈(Quiz)와 연관된 기록(QuizAttempt) 삭제
        quizzes = session.exec(select(Quiz).where(Quiz.diary_id == diary_id)).all()
        for quiz in quizzes:
            attempts = session.exec(select(QuizAttempt).where(QuizAttempt.quiz_id == quiz.id)).all()
            for attempt in attempts:
                session.delete(attempt)
            session.delete(quiz)
            
        # 4. 다이어리 본체 삭제
        session.delete(diary)
        session.commit()
        
        return {"success": True, "message": "Diary and related data deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
