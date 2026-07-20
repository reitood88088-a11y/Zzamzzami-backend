from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
import uuid
from ..database import get_session
from ..models import User, UserQuote

router = APIRouter(prefix="/quotes", tags=["Quotes"])

class QuoteRequest(BaseModel):
    text: str

@router.get("")
def get_quotes(session: Session = Depends(get_session)):
    try:
        user = session.query(User).first()
        if not user:
            return {"success": True, "data": []}
            
        quotes = session.exec(
            select(UserQuote)
            .where(UserQuote.user_id == user.id)
            .order_by(UserQuote.created_at.desc())
        ).all()
        
        return {
            "success": True,
            "data": [
                {
                    "id": str(q.id),
                    "text": q.text,
                    "createdAt": q.created_at.isoformat()
                } for q in quotes
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("")
def add_quote(request: QuoteRequest, session: Session = Depends(get_session)):
    try:
        user = session.query(User).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        new_quote = UserQuote(user_id=user.id, text=request.text)
        session.add(new_quote)
        session.commit()
        
        return {
            "success": True,
            "data": {
                "id": str(new_quote.id),
                "text": new_quote.text,
                "createdAt": new_quote.created_at.isoformat()
            }
        }
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{quote_id}")
def delete_quote(quote_id: str, session: Session = Depends(get_session)):
    try:
        quote = session.get(UserQuote, uuid.UUID(quote_id))
        if not quote:
            raise HTTPException(status_code=404, detail="Quote not found")
            
        session.delete(quote)
        session.commit()
        return {"success": True}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
