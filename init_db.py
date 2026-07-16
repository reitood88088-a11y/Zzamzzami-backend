import os
from sqlmodel import SQLModel
from api.database import engine
# Import all models to ensure they are registered with SQLModel
from api import models
from dotenv import load_dotenv

load_dotenv()

def init_db():
    print("Creating tables in the database...")
    SQLModel.metadata.create_all(engine)
    print("Tables created successfully!")

if __name__ == "__main__":
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("Error: DATABASE_URL not found in .env")
    else:
        init_db()
