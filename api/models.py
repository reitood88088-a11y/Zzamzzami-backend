from sqlmodel import SQLModel, Field, Column
from sqlalchemy.dialects.postgresql import JSONB
import uuid
from typing import Optional, Any
from datetime import datetime, date as datetime_date, timezone
from enum import Enum

class SubjectType(str, Enum):
    English = "English"
    Chinese = "Chinese"
    Japanese = "Japanese"

class WordStatusType(str, Enum):
    KNOW = "KNOW"
    AGAIN = "AGAIN"
    DONT_KNOW = "DONT_KNOW"

def get_utcnow():
    return datetime.now(timezone.utc)

class User(SQLModel, table=True):
    __tablename__ = "users"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(unique=True, index=True)
    name: str
    total_study_minutes: int = Field(default=0)
    consecutive_days: int = Field(default=0)
    created_at: datetime = Field(default_factory=get_utcnow)
    updated_at: datetime = Field(default_factory=get_utcnow)

class Diary(SQLModel, table=True):
    __tablename__ = "diaries"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    subject: SubjectType
    date: datetime_date = Field(default_factory=datetime_date.today)
    content_snippet: Optional[str] = None
    full_text: str
    is_new: bool = Field(default=True)
    created_at: datetime = Field(default_factory=get_utcnow)

class Word(SQLModel, table=True):
    __tablename__ = "words"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    diary_id: uuid.UUID = Field(foreign_key="diaries.id")
    word: str
    reading: Optional[str] = Field(default=None)  # 한어병음(중국어) 또는 히라가나(일본어)
    meaning: str
    example_sentence: Optional[str] = None
    created_at: datetime = Field(default_factory=get_utcnow)

class UserWordStatus(SQLModel, table=True):
    __tablename__ = "user_word_statuses"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    word_id: uuid.UUID = Field(foreign_key="words.id")
    status: WordStatusType
    updated_at: datetime = Field(default_factory=get_utcnow)

class Quiz(SQLModel, table=True):
    __tablename__ = "quizzes"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    diary_id: uuid.UUID = Field(foreign_key="diaries.id")
    question: str
    options: Any = Field(default=list, sa_column=Column(JSONB))
    correct_option_index: int
    explanation: str
    created_at: datetime = Field(default_factory=get_utcnow)

class QuizAttempt(SQLModel, table=True):
    __tablename__ = "quiz_attempts"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    quiz_id: uuid.UUID = Field(foreign_key="quizzes.id")
    is_correct: bool
    created_at: datetime = Field(default_factory=get_utcnow)
