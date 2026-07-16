import sys
try:
    from api.database import engine
    from sqlmodel import SQLModel
    from api import models
    print("Database models loaded successfully:")
    print(list(SQLModel.metadata.tables.keys()))
except Exception as e:
    print(f"Error loading models: {e}")
    sys.exit(1)
