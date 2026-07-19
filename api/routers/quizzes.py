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

import os
import json
import google.generativeai as genai
from ..models import Word

@router.post("/regenerate_all")
def regenerate_all_quizzes(session: Session = Depends(get_session)):
    try:
        genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
        model = genai.GenerativeModel('gemini-flash-latest')
        
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
            
            response = model.generate_content(prompt)
            text = response.text.strip()
            if text.startswith("```json"): text = text[7:]
            if text.startswith("```"): text = text[3:]
            if text.endswith("```"): text = text[:-3]
            new_quizzes_data = json.loads(text.strip())
            
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

