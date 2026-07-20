from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from sqlalchemy import func
from ..database import get_session
from ..models import User, QuizAttempt, UserWordStatus, WordStatusType, DailyStudyTime, Word, Diary, Quiz
from pydantic import BaseModel
from datetime import date as datetime_date, timedelta

class StudyTimeRequest(BaseModel):
    subject: str
    seconds: int

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
                    "quizAccuracy": 0.0,
                    "wordsLearned": 0
                }
            }
            
        # Words Learned per subject
        words_query = select(Diary.subject, func.count(UserWordStatus.id)).join(
            Word, Word.id == UserWordStatus.word_id
        ).join(
            Diary, Diary.id == Word.diary_id
        ).where(
            UserWordStatus.user_id == user.id,
            UserWordStatus.status == WordStatusType.KNOW
        ).group_by(Diary.subject)
        
        words_learned_rows = session.exec(words_query).all()
        words_learned = {"ALL": 0, "English": 0, "Chinese": 0, "Japanese": 0}
        for subject, count in words_learned_rows:
            subject_name = subject.value if hasattr(subject, 'value') else subject
            words_learned[subject_name] = count
            words_learned["ALL"] += count
            
        # Quiz Accuracy per subject
        quiz_attempts_query = select(Diary.subject, QuizAttempt.is_correct, func.count(QuizAttempt.id)).join(
            Quiz, Quiz.id == QuizAttempt.quiz_id
        ).join(
            Diary, Diary.id == Quiz.diary_id
        ).where(
            QuizAttempt.user_id == user.id
        ).group_by(Diary.subject, QuizAttempt.is_correct)
        
        quiz_rows = session.exec(quiz_attempts_query).all()
        
        quiz_stats = {
            "ALL": {"total": 0, "correct": 0},
            "English": {"total": 0, "correct": 0},
            "Chinese": {"total": 0, "correct": 0},
            "Japanese": {"total": 0, "correct": 0}
        }
        
        for subject, is_correct, count in quiz_rows:
            subject_name = subject.value if hasattr(subject, 'value') else subject
            quiz_stats[subject_name]["total"] += count
            quiz_stats["ALL"]["total"] += count
            if is_correct:
                quiz_stats[subject_name]["correct"] += count
                quiz_stats["ALL"]["correct"] += count
                
        quiz_accuracy = {"ALL": 0.0, "English": 0.0, "Chinese": 0.0, "Japanese": 0.0}
        for k, v in quiz_stats.items():
            if v["total"] > 0:
                quiz_accuracy[k] = round((v["correct"] / v["total"]) * 100, 1)
        
        import time
        from datetime import date as datetime_date, timedelta
        
        last_week = datetime_date.today() - timedelta(days=6)
        study_times = session.exec(
            select(DailyStudyTime).where(
                DailyStudyTime.user_id == user.id,
                DailyStudyTime.date >= last_week
            )
        ).all()
        
        weekly_chart = {
            "ALL": [],
            "English": [],
            "Chinese": [],
            "Japanese": []
        }
        
        today = datetime_date.today()
        python_weekday_map = {6: 'sun.', 0: 'mon.', 1: 'tue.', 2: 'wed.', 3: 'thu.', 4: 'fri.', 5: 'sat.'}
        date_to_index = {}
        
        for i in range(6, -1, -1):
            d = today - timedelta(days=i)
            day_name = python_weekday_map[d.weekday()]
            date_ms = int(time.mktime(d.timetuple())) * 1000
            
            date_to_index[d] = 6 - i
            for k in weekly_chart.keys():
                weekly_chart[k].append({"day": day_name, "value": 0, "date": date_ms})
                
        for st in study_times:
            if st.date in date_to_index:
                idx = date_to_index[st.date]
                minutes = round(st.duration_seconds / 60)
                subject_name = st.subject.value if hasattr(st.subject, 'value') else st.subject
                
                weekly_chart["ALL"][idx]["value"] += minutes
                if subject_name in weekly_chart:
                    weekly_chart[subject_name][idx]["value"] += minutes
                    
        hours_saved = {"ALL": 0.0, "English": 0.0, "Chinese": 0.0, "Japanese": 0.0}
        for k in weekly_chart.keys():
            total_minutes_week = sum(item["value"] for item in weekly_chart[k])
            hours_saved[k] = round(total_minutes_week / 60, 1)
        
        return {
            "success": True,
            "data": {
                "totalStudyMinutes": user.total_study_minutes,
                "consecutiveDays": user.consecutive_days,
                "quizAccuracy": quiz_accuracy,
                "wordsLearned": words_learned,
                "weeklyChart": weekly_chart,
                "hoursSaved": hours_saved
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/time")
def report_study_time(
    request: StudyTimeRequest,
    session: Session = Depends(get_session)
):
    try:
        user = session.query(User).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        today = datetime_date.today()
        yesterday = today - timedelta(days=1)
        
        # Check if user studied today across ANY subject
        studied_today = session.exec(
            select(DailyStudyTime).where(
                DailyStudyTime.user_id == user.id,
                DailyStudyTime.date == today
            )
        ).first()
        
        if not studied_today:
            # First time studying today. Did they study yesterday?
            studied_yesterday = session.exec(
                select(DailyStudyTime).where(
                    DailyStudyTime.user_id == user.id,
                    DailyStudyTime.date == yesterday
                )
            ).first()
            
            if studied_yesterday:
                user.consecutive_days += 1
            else:
                user.consecutive_days = 1
        
        # Upsert DailyStudyTime for today and this specific subject
        daily_record = session.exec(
            select(DailyStudyTime).where(
                DailyStudyTime.user_id == user.id,
                DailyStudyTime.subject == request.subject,
                DailyStudyTime.date == today
            )
        ).first()
        
        if daily_record:
            daily_record.duration_seconds += request.seconds
        else:
            daily_record = DailyStudyTime(
                user_id=user.id,
                subject=request.subject,
                date=today,
                duration_seconds=request.seconds
            )
            session.add(daily_record)
            
        # Update user total study minutes
        session.flush()
        total_seconds_result = session.exec(
            select(func.sum(DailyStudyTime.duration_seconds)).where(
                DailyStudyTime.user_id == user.id
            )
        ).one()
        
        total_minutes = (total_seconds_result or 0) // 60
        user.total_study_minutes = total_minutes
        
        session.commit()
        return {"success": True}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
