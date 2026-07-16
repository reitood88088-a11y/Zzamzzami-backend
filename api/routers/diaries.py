from fastapi import APIRouter, Depends, Query
from sqlmodel import Session
from typing import Optional
from ..database import get_session

router = APIRouter(prefix="/diaries", tags=["Diaries"])

@router.get("")
def get_diaries(
    subject: Optional[str] = Query(None),
    session: Session = Depends(get_session)
):
    # Mock DB query
    return {
        "success": True,
        "data": [
            {
                "id": "e1",
                "subject": subject or "English",
                "date": "07.12",
                "contentSnippet": "The quick brown fox...",
                "fullText": "The quick brown fox jumps over the lazy dog.",
                "isNew": True
            }
        ]
    }
