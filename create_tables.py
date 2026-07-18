import psycopg2
import os

DATABASE_URL = "postgresql://postgres:password@localhost:5432/zzamzzami_db"

try:
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cursor = conn.cursor()

    # Create user_quote table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_quote (
            id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            text TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    """)

    # Create daily_study_time table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS daily_study_time (
            id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            subject VARCHAR(50) NOT NULL,
            date DATE NOT NULL,
            duration_seconds INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (user_id, subject, date)
        );
    """)

    print("Tables created successfully!")

except Exception as e:
    print(f"Error: {e}")
finally:
    if 'cursor' in locals():
        cursor.close()
    if 'conn' in locals():
        conn.close()
