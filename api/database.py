import os
from sqlmodel import create_engine, Session
from dotenv import load_dotenv

load_dotenv()

# Vercel 환경에서는 기본적으로 Connection Pool 관리형(Neon 등) DB를 사용하는 것이 좋습니다.
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/zzamzzami")

# 서버리스 환경에서의 Pool 설정 (너무 많은 커넥션 방지)
engine = create_engine(
    DATABASE_URL, 
    echo=False, 
    pool_size=5, 
    max_overflow=10
)

def get_session():
    with Session(engine) as session:
        yield session
