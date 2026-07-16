from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from sqlalchemy import func
from ..database import get_session
from ..models import User, QuizAttempt

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("")
def get_dashboard(session: Session = Depends(get_session)):
    try:
        user = session.query(User).first()
        if not user:
            return {
                "success": True,
                "data": {
                    "totalStudyMinutes": 0,
                    "consecutiveDays": 0,
                    "quizAccuracy": 0.0
                }
            }
            
        total_attempts = session.exec(select(func.count(QuizAttempt.id)).where(QuizAttempt.user_id == user.id)).one()
        correct_attempts = session.exec(select(func.count(QuizAttempt.id)).where(QuizAttempt.user_id == user.id, QuizAttempt.is_correct == True)).one()
        
        accuracy = (correct_attempts / total_attempts * 100) if total_attempts > 0 else 0.0
        
        return {
            "success": True,
            "data": {
                "totalStudyMinutes": user.total_study_minutes,
                "consecutiveDays": user.consecutive_days,
                "quizAccuracy": round(accuracy, 1)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
