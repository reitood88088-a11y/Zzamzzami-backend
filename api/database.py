import os
from sqlmodel import create_engine, Session
from dotenv import load_dotenv

load_dotenv()

# Vercel 환경에서는 기본적으로 Connection Pool 관리형(Neon 등) DB를 사용하는 것이 좋습니다.
db_url = os.getenv("DATABASE_URL", "").strip('"').strip("'")
# Windows 환경의 한글 경로 문제(psycopg2 인코딩 버그)를 피하기 위해 pg8000 드라이버 사용
if db_url.startswith("postgresql://"):
    db_url = db_url.replace("postgresql://", "postgresql+pg8000://", 1)

DATABASE_URL = db_url

if not DATABASE_URL:
    # 기본 로컬 개발용 URL (Supabase 등 클라우드 DB로 교체 필요)
    DATABASE_URL = "postgresql+pg8000://postgres:postgres@localhost:5432/zzamzzami"

# connect_args를 통해 SSL 등의 설정을 추가할 수 있습니다.
engine = create_engine(
    DATABASE_URL, 
    echo=False, 
    pool_size=5, 
    max_overflow=10
)

def get_session():
    with Session(engine) as session:
        yield session
