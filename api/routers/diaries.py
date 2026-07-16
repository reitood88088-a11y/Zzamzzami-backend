from fastapi import APIRouter, Depends, Query, HTTPException
from sqlmodel import Session, select
from typing import Optional
from ..database import get_session
from ..models import Diary

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
