from fastapi import APIRouter, Depends
from sqlmodel import Session
from ..database import get_session

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("")
def get_dashboard(session: Session = Depends(get_session)):
    return {
        "success": True,
        "data": {
            "totalStudyMinutes": 120,
            "consecutiveDays": 5,
            "quizAccuracy": 85.5
        }
    }
