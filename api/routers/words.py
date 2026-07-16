from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlmodel import Session
from ..database import get_session
from ..models import WordStatusType

router = APIRouter(prefix="/words", tags=["Words"])

class WordStatusUpdateRequest(BaseModel):
    wordId: str
    status: WordStatusType

@router.get("/review")
def get_words_review(
    subject: str = Query(...),
    session: Session = Depends(get_session)
):
    return {
        "success": True,
        "data": [
            {
                "wordId": "w1",
                "diaryId": "e1",
                "word": "quick",
                "meaning": "빠른",
                "exampleSentence": "The quick brown fox jumps over the lazy dog."
            }
        ]
    }

@router.post("/status")
def update_word_status(
    request: WordStatusUpdateRequest,
    session: Session = Depends(get_session)
):
    return {
        "success": True,
        "message": "Word status updated successfully."
    }
