from fastapi import APIRouter, Depends, Query, HTTPException
from sqlmodel import Session, select
from datetime import datetime, timedelta
from ..database import get_session
from ..models import Quiz, Diary, User, QuizAttempt
from pydantic import BaseModel
import uuid

class QuizAttemptRequest(BaseModel):
    quizId: str
    isCorrect: bool

router = APIRouter(prefix="/quizzes", tags=["Quizzes"])

import os
import json
import google.generativeai as genai
from ..models import Word

@router.get("")
def get_quizzes(
    subject: str = Query(default="ALL"),
    session: Session = Depends(get_session)
):
    try:
        user = session.query(User).first()
        if not user:
            return {"success": True, "data": []}
            
        from datetime import timezone
        twenty_four_hours_ago = datetime.now(timezone.utc) - timedelta(hours=24)
        
        diary_query = select(Diary).where(
            Diary.user_id == user.id,
            Diary.created_at >= twenty_four_hours_ago
        )
        if subject != "ALL":
            diary_query = diary_query.where(Diary.subject == subject)
            
        recent_diaries = session.exec(diary_query).all()
        if not recent_diaries:
            return {"success": True, "data": []}
            
        diary_ids = [d.id for d in recent_diaries]
        
        quiz_query = select(Quiz, Diary).join(Diary).where(
            Quiz.diary_id.in_(diary_ids)
        ).order_by(Quiz.created_at.desc())
        
        existing_quizzes = session.exec(quiz_query).all()
        existing_diary_ids = {quiz.diary_id for quiz, diary in existing_quizzes}
        
        diaries_needing_quizzes = [d for d in recent_diaries if d.id not in existing_diary_ids]
        
        if diaries_needing_quizzes:
            genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
            models_to_try = ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-1.5-flash-latest', 'gemini-pro-latest']
            
            for d in diaries_needing_quizzes:
                words = session.exec(select(Word).where(Word.diary_id == d.id)).all()
                if not words:
                    continue
                    
                word_list = [{"word": w.word, "meaning": w.meaning} for w in words]
                
                prompt = f"""
                You are an AI assistant for a language learning app. Language: {d.subject if d.subject != 'ALL' else 'Mixed'}
                Extracted Words: {json.dumps(word_list, ensure_ascii=False)}

                Generate exactly 3 multiple-choice questions (4 options each) based on the EXTRACTED WORDS. Mix the following two types of quizzes:
                   [Type 1: Synonym Quiz]
                   - Question: Ask to find a word that has the same meaning as one of the extracted words.
                   - Options: 1 correct synonym, 3 clearly incorrect words. The incorrect words MUST have completely different meanings from the answer. Do not use words with similar meanings as distractors.
                   - Explanation: MUST explicitly mention the extracted word, provide its synonym (the correct answer), and provide an antonym for additional learning.
                   
                   [Type 2: Morphological/Visual Similarity Quiz]
                   - Question: Provide the Korean meaning of one of the extracted words and ask which word it is.
                   - Options: 1 correct word (the extracted word), 3 visually or morphologically similar distractors that have completely different meanings.
                     * English: Use prefix/suffix variations or spelling tricks (e.g., affect vs effect/infect/defect).
                     * Chinese: Use words with the same phonetic component but different radicals (e.g., 渴 vs 喝/褐).
                     * Japanese: Use similar looking kanji or homophones (e.g., 待つ vs 持つ).
                   - Explanation: Explain the meaning of the correct answer and the distractors to clarify the confusion.

                Ensure there is a total of exactly 3 quizzes in the "quizzes" array. Return ONLY a JSON array of quizzes, exactly matching this format:
                [
                  {{
                    "question": "What is a synonym for 'affect'?",
                    "options": ["influence", "apple", "car", "dog"],
                    "correct_option_index": 0,
                    "explanation": "'influence' is a synonym for 'affect'. An antonym would be 'remain'."
                  }}
                ]
                """
                
                last_exception = None
                new_quizzes_data = []
                
                for model_name in models_to_try:
                    for attempt in range(2):
                        try:
                            model = genai.GenerativeModel(model_name)
                            response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
                            text = response.text.strip()
                            
                            start_idx = text.find('[')
                            end_idx = text.rfind(']')
                            
                            if start_idx != -1 and end_idx != -1:
                                json_str = text[start_idx:end_idx+1]
                                new_quizzes_data = json.loads(json_str)
                                break 
                            else:
                                raise Exception("No JSON array found in Gemini response")
                                
                        except Exception as e:
                            print(f"[{model_name}] Attempt {attempt + 1} Failed: {e}. Trying next...")
                            last_exception = e
                            continue
                    if new_quizzes_data:
                        break
                        
                if not new_quizzes_data:
                    print(f"Gemini API Error for diary {d.id}. Using fallback generation.")
                    import random
                    fallback_quizzes = []
                    if len(word_list) > 0:
                        for i in range(min(3, len(word_list))):
                            w = word_list[i]
                            fallback_quizzes.append({
                                "question": f"'{w['word']}'의 뜻으로 알맞은 것은?",
                                "options": [w['meaning'], "전혀 다른 뜻 1", "전혀 다른 뜻 2", "전혀 다른 뜻 3"],
                                "correct_option_index": 0,
                                "explanation": f"API 오류로 자동 생성된 임시 퀴즈입니다. 정답은 '{w['meaning']}'입니다."
                            })
                    else:
                        fallback_quizzes = [
                            {
                                "question": "단어가 충분하지 않습니다. 다이어리를 먼저 스캔해주세요.",
                                "options": ["확인", "-", "-", "-"],
                                "correct_option_index": 0,
                                "explanation": "스캔된 단어가 없습니다."
                            }
                        ]
                    new_quizzes_data = fallback_quizzes

                for qd in new_quizzes_data:
                    new_quiz = Quiz(
                        diary_id=d.id,
                        question=qd['question'],
                        options=qd['options'],
                        correct_option_index=qd['correct_option_index'],
                        explanation=qd['explanation']
                    )
                    session.add(new_quiz)
                session.commit()
            
            # Re-fetch quizzes after generating missing ones
            existing_quizzes = session.exec(quiz_query).all()

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
                } for quiz, diary in existing_quizzes
            ]
        }
    except Exception as e:
        print(f"Error in get_quizzes: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/regenerate_all")
def regenerate_all_quizzes(session: Session = Depends(get_session)):
    try:
        genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
        models_to_try = ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-1.5-flash-latest', 'gemini-pro-latest']
        
        diaries = session.exec(select(Diary)).all()
        for row in diaries:
            d = row[0] if hasattr(row, '_mapping') else row
            words = session.exec(select(Word).where(Word.diary_id == d.id)).all()
            word_list = [{"word": w[0].word if hasattr(w, '_mapping') else w.word, "meaning": w[0].meaning if hasattr(w, '_mapping') else w.meaning} for w in words]
            
            prompt = f"""
            You are an AI assistant for a language learning app. Language: {d.subject}
            Extracted Words: {json.dumps(word_list, ensure_ascii=False)}

            Generate exactly 3 multiple-choice questions (4 options each) based on the EXTRACTED WORDS. Mix the following two types of quizzes:
               [Type 1: Synonym Quiz]
               - Question: Ask to find a word that has the same meaning as one of the extracted words.
               - Options: 1 correct synonym, 3 clearly incorrect words. The incorrect words MUST have completely different meanings from the answer. Do not use words with similar meanings as distractors.
               - Explanation: MUST explicitly mention the extracted word, provide its synonym (the correct answer), and provide an antonym for additional learning.
               
               [Type 2: Morphological/Visual Similarity Quiz]
               - Question: Provide the Korean meaning of one of the extracted words and ask which word it is.
               - Options: 1 correct word (the extracted word), 3 visually or morphologically similar distractors that have completely different meanings.
                 * English: Use prefix/suffix variations or spelling tricks (e.g., affect vs effect/infect/defect).
                 * Chinese: Use words with the same phonetic component but different radicals (e.g., 渴 vs 喝/褐).
                 * Japanese: Use similar looking kanji or homophones (e.g., 待つ vs 持つ).
               - Explanation: Explain the meaning of the correct answer and the distractors to clarify the confusion.

            Ensure there is a total of exactly 3 quizzes in the "quizzes" array. Return ONLY a JSON array of quizzes, exactly matching this format:
            [
              {{
                "question": "What is a synonym for 'affect'?",
                "options": ["influence", "apple", "car", "dog"],
                "correct_option_index": 0,
                "explanation": "'influence' is a synonym for 'affect'. An antonym would be 'remain'."
              }}
            ]
            """
            
            last_exception = None
            new_quizzes_data = []
            
            for model_name in models_to_try:
                try:
                    model = genai.GenerativeModel(model_name)
                    response = model.generate_content(prompt)
                    text = response.text.strip()
                    if text.startswith("```json"): text = text[7:]
                    if text.startswith("```"): text = text[3:]
                    if text.endswith("```"): text = text[:-3]
                    new_quizzes_data = json.loads(text.strip())
                    break
                except Exception as e:
                    print(f"[{model_name}] Failed: {e}. Trying next...")
                    last_exception = e
                    continue
                        
            if not new_quizzes_data and last_exception:
                raise last_exception
            
            old_quizzes = session.exec(select(Quiz).where(Quiz.diary_id == d.id)).all()
            for oq in old_quizzes:
                session.delete(oq[0] if hasattr(oq, '_mapping') else oq)
                
            for qd in new_quizzes_data:
                new_quiz = Quiz(
                    diary_id=d.id,
                    question=qd['question'],
                    options=qd['options'],
                    correct_option_index=qd['correct_option_index'],
                    explanation=qd['explanation']
                )
                session.add(new_quiz)
                
            session.commit()
            
        return {"success": True, "message": "Successfully regenerated all quizzes."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/attempt")
def submit_quiz_attempt(
    request: QuizAttemptRequest,
    session: Session = Depends(get_session)
):
    try:
        user = session.query(User).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        attempt = QuizAttempt(
            user_id=user.id,
            quiz_id=uuid.UUID(request.quizId),
            is_correct=request.isCorrect
        )
        session.add(attempt)
        session.commit()
        return {"success": True}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

