# Zzamzzami RESTful API 명세서 (FastAPI)

기술 스택(FastAPI)을 기반으로 작성된 백엔드 연동용 API 명세서입니다.

## 기본 정보 (Base URL)
- **Base URL**: `/api/v1`
- **Swagger UI (OpenAPI)**: `/docs` (FastAPI 내장 자동 생성 문서 제공)
- **Content-Type**: `application/json` (단, 파일 업로드 시 `multipart/form-data`)
- **응답 형식 (Response Format)**: 모든 API는 Pydantic 스키마를 통해 검증되며, 아래와 같은 일관된 래퍼(Wrapper) 구조를 가집니다.
  ```json
  {
    "success": true,
    "data": { ... } // 에러 발생 시 "error": "에러 메시지"
  }
  ```

---

## 1. 스캔 및 텍스트 추출 API (OCR 스캔 엔진)
> **기능 명세 연동**: 스마트폰 카메라로 교재 촬영 시 즉시 텍스트(단어/문장) 추출 및 분리 저장 (우선순위: 상)

- **Endpoint**: `POST /scan`
- **Description**: 교재 사진(File)을 받아 FastAPI의 백그라운드 태스크나 비동기 로직으로 텍스트를 추출하고 `Diary` 데이터 모델(SQLAlchemy/SQLModel)로 저장합니다.
- **Request Format** (`multipart/form-data`):
  - `image` (UploadFile): 촬영된 교재 사진 파일
  - `subject` (String): 언어 선택 (`English`, `Chinese`, `Japanese`)
- **Response Format** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": "e4",
      "subject": "English",
      "date": "07.13",
      "contentSnippet": "This is a scanned...",
      "fullText": "This is a scanned text from the image.",
      "isNew": true
    }
  }
  ```

## 2. 홈 뷰 다이어리 목록 조회 API
> **기능 명세 연동**: 스캔한 텍스트 데이터를 언어별(영어, 중국어, 일본어)로 분류하여 제공, 날짜별 가로 스와이프 탐색 지원.

- **Endpoint**: `GET /diaries`
- **Description**: 스캔한 원본 텍스트 데이터를 조회합니다. 언어별, 날짜별로 정렬하여 반환합니다.
- **Query Parameters**:
  - `subject` (String, Optional): 특정 언어 필터링 (`English`, `Chinese`, `Japanese`)
- **Response Format** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "e1",
        "subject": "English",
        "date": "07.12",
        "contentSnippet": "The quick brown fox...",
        "fullText": "The quick brown fox jumps over the lazy dog.",
        "isNew": true
      }
    ]
  }
  ```

## 3. 릴스형(Reels) 단어 복습 피드 API
> **기능 명세 연동**: 전날 스캔한 텍스트와 주요 단어를 세로 스크롤 방식(릴스형)으로 제공.

- **Endpoint**: `GET /words/review`
- **Description**: 저장된 스캔 텍스트에서 파이썬 기반 AI 모듈을 통해 추출한 단어, 뜻, 예문을 인스타그램 릴스 형태의 카드로 제공합니다.
- **Query Parameters**:
  - `subject` (String): 대상 언어 (`English`, `Chinese`, `Japanese`)
- **Response Format** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "wordId": "w1",
        "diaryId": "e1",
        "word": "quick",
        "meaning": "빠른",
        "exampleSentence": "The quick brown fox jumps over the lazy dog."
      }
    ]
  }
  ```

## 4. 릴스 복습 단어 상태 업데이트 API
> **기능 명세 연동**: 단어 복습 상태('알아요', '한번더', '몰라요') 매커니즘 저장.

- **Endpoint**: `POST /words/status`
- **Description**: 특정 단어에 대한 사용자의 인지 상태를 데이터베이스에 반영합니다. Pydantic 스키마 기반의 강력한 상태 유효성(Enum) 검증을 거칩니다.
- **Request Format** (`application/json`):
  ```json
  {
    "wordId": "w1",
    "status": "KNOW" // Enum: "KNOW"(알아요), "AGAIN"(한번더), "DONT_KNOW"(몰라요)
  }
  ```
- **Response Format** (200 OK):
  ```json
  {
    "success": true,
    "message": "Word status updated successfully."
  }
  ```

## 5. 스토리형(Stories) AI 퀴즈 API
> **기능 명세 연동**: 스캔한 내용을 바탕으로 AI가 생성한 변형 퀴즈를 스토리 형식으로 제공.

- **Endpoint**: `GET /quizzes`
- **Description**: AI가 단어를 바탕으로 생성한 변형 퀴즈 및 인사이트(해설) 정보를 반환합니다. 파이썬 비동기 통신(asyncio)을 이용해 LLM 응답 대기 시간을 최소화합니다.
- **Query Parameters**:
  - `subject` (String): 대상 언어 (`English`, `Chinese`, `Japanese`)
- **Response Format** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "quizId": "q1",
        "diaryId": "e1",
        "question": "다음 빈칸에 알맞은 단어는? The _____ brown fox jumps over the lazy dog.",
        "options": ["quick", "slow", "lazy"],
        "correctOptionIndex": 0,
        "explanation": "quick은 '빠른'이라는 뜻으로, 문맥상 여우의 움직임을 묘사하는 데 가장 적합합니다. (스캔된 원문 기반 추출)"
      }
    ]
  }
  ```

## 6. 나의 공부 분석 대시보드 API
> **기능 명세 연동**: 누적 학습 시간, 연속 학습일수, 퀴즈 정답률 등을 시각화하여 제공.

- **Endpoint**: `GET /dashboard`
- **Description**: 사용자의 학습 통계 및 달성률 데이터를 데이터베이스(PostgreSQL)에서 쿼리하여 반환합니다.
- **Response Format** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "totalStudyMinutes": 120, // 누적 학습 시간(분)
      "consecutiveDays": 5, // 연속 학습일수
      "quizAccuracy": 85.5 // 퀴즈 정답률(%)
    }
  }
  ```
