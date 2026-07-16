from fastapi import APIRouter, Depends, Query
from sqlmodel import Session
from ..database import get_session

router = APIRouter(prefix="/quizzes", tags=["Quizzes"])

@router.get("")
def get_quizzes(
    subject: str = Query(...),
    session: Session = Depends(get_session)
):
    return {
        "success": True,
        "data": [
            {
                "quizId": "q1",
                "diaryId": "e1",
                "question": "다음 빈칸에 알맞은 단어는? The _____ brown fox jumps over the lazy dog.",
                "options": ["quick", "slow", "lazy"],
                "correctOptionIndex": 0,
                "explanation": "quick은 '빠른'이라는 뜻으로, 문맥상 여우의 움직임을 묘사하는 데 가장 적합합니다. (스캔된 원문 기반 추출)"
            }
        ]
    }
