from fastapi import APIRouter, Depends, Query, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select
from ..database import get_session
from ..models import WordStatusType, Word, UserWordStatus, User, Diary

router = APIRouter(prefix="/words", tags=["Words"])

class WordStatusUpdateRequest(BaseModel):
    wordId: str
    status: WordStatusType

@router.get("/review")
def get_words_review(
    subject: str = Query(...),
    session: Session = Depends(get_session)
):
    try:
        # Get words belonging to diaries of a specific subject
        query = select(Word, Diary).join(Diary).where(Diary.subject == subject).order_by(Word.created_at.desc())
        results = session.exec(query).all()
        
        return {
            "success": True,
            "data": [
                {
                    "wordId": str(word.id),
                    "diaryId": str(diary.id),
                    "word": word.word,
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
        user = session.query(User).first()
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
