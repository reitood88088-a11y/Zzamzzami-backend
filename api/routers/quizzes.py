from fastapi import APIRouter, Depends, Query, HTTPException
from sqlmodel import Session, select
from ..database import get_session
from ..models import Quiz, Diary

router = APIRouter(prefix="/quizzes", tags=["Quizzes"])

@router.get("")
def get_quizzes(
    subject: str = Query(...),
    session: Session = Depends(get_session)
):
    try:
        query = select(Quiz, Diary).join(Diary).where(Diary.subject == subject).order_by(Quiz.created_at.desc())
        results = session.exec(query).all()
        
        return {
            "success": True,
            "data": [
                {
                    "quizId": str(quiz.id),
                    "diaryId": str(diary.id),
                    "question": quiz.question,
                    "options": quiz.options,
                    "correctOptionIndex": quiz.correct_option_index,
                    "explanation": quiz.explanation
                } for quiz, diary in results
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
