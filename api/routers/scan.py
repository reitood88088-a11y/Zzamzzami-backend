from fastapi import APIRouter, File, UploadFile, Form, Depends, HTTPException
from sqlmodel import Session
from ..database import get_session
from ..models import Diary, Word, Quiz, SubjectType, User
from ..services.gemini_service import process_diary_image

router = APIRouter(prefix="/scan", tags=["Scan"])

@router.post("")
async def scan_document(
    image: UploadFile = File(...),
    subject: str = Form(...),
    session: Session = Depends(get_session)
):
    try:
        image_bytes = await image.read()
        mime_type = image.content_type or "image/jpeg"
        
        # Gemini AI로 이미지 분석 (OCR, 단어, 퀴즈 추출)
        result = process_diary_image(image_bytes, mime_type)
        
        # 임시 테스트용 유저 생성 (아직 인증이 없으므로)
        user = session.query(User).first()
        if not user:
            user = User(email="test@example.com", name="Test User")
            session.add(user)
            session.commit()
            session.refresh(user)

        # Gemini가 판별한 언어가 있으면 우선 사용, 없으면 폼 데이터 subject(기본값) 사용
        detected_language = result.get("language")
        final_subject = detected_language if detected_language in ["English", "Chinese", "Japanese"] else subject

        # 다이어리 DB 저장
        diary = Diary(
            user_id=user.id,
            subject=final_subject,
            full_text=result.get("full_text", ""),
            content_snippet=result.get("full_text", "")[:50] + "..." if result.get("full_text") else "",
            is_new=True
        )
        session.add(diary)
        session.commit()
        session.refresh(diary)
        
        # 추출된 단어 DB 저장
        for w in result.get("words", []):
            word_obj = Word(
                diary_id=diary.id,
                word=w.get("word", ""),
                meaning=w.get("meaning", ""),
                example_sentence=w.get("example_sentence", "")
            )
            session.add(word_obj)
            
        # 생성된 퀴즈 DB 저장
        for q in result.get("quizzes", []):
            quiz_obj = Quiz(
                diary_id=diary.id,
                question=q.get("question", ""),
                options=q.get("options", []),
                correct_option_index=q.get("correct_option_index", 0),
                explanation=q.get("explanation", "")
            )
            session.add(quiz_obj)
            
        session.commit()
        
        return {
            "success": True,
            "data": {
                "id": str(diary.id),
                "subject": diary.subject.value if hasattr(diary.subject, 'value') else diary.subject,
                "date": diary.date.strftime("%Y.%m.%d") if hasattr(diary.date, 'strftime') else str(diary.date),
                "contentSnippet": diary.content_snippet,
                "fullText": diary.full_text,
                "isNew": diary.is_new
            }
        }
    except Exception as e:
        print(f"Scan error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
