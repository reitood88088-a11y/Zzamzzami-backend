export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';


export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    cache: 'no-store',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// 1. 스캔 (OCR)
export async function uploadScan(file: File, subject: string) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('subject', subject);

  const response = await fetch(`${API_BASE_URL}/scan`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Scan failed');
  return response.json();
}

// 2. 다이어리 목록
export async function getDiaries(subject?: string) {
  const query = subject ? `?subject=${subject}` : '';
  return fetchApi(`/diaries${query}`);
}

export async function deleteDiary(id: string) {
  return fetchApi(`/diaries/${id}`, {
    method: 'DELETE',
  });
}

// 3. 복습 단어
export async function getReviewWords(subject?: string) {
  const query = subject ? `?subject=${subject}` : '';
  return fetchApi(`/words/review${query}`);
}

// 4. 단어 상태 업데이트
export async function updateWordStatus(wordId: string, status: string) {
  return fetchApi(`/words/status`, {
    method: 'POST',
    body: JSON.stringify({ wordId, status }),
  });
}

// 5. 퀴즈
export async function getQuizzes(subject: string) {
  return fetchApi(`/quizzes?subject=${subject}`);
}

export async function submitQuizAttempt(quizId: string, isCorrect: boolean) {
  return fetchApi(`/quizzes/attempt`, {
    method: 'POST',
    body: JSON.stringify({ quizId, isCorrect }),
  });
}

// 6. 대시보드
export async function getDashboard() {
  return fetchApi(`/dashboard`);
}

export async function reportStudyTime(subject: string, seconds: number) {
  return fetchApi(`/dashboard/time`, {
    method: 'POST',
    body: JSON.stringify({ subject, seconds }),
  });
}

// 7. 명언 (Quotes)
export async function getQuotes() {
  return fetchApi(`/quotes`);
}

export async function addQuote(text: string) {
  return fetchApi(`/quotes`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}

export async function deleteQuote(id: string) {
  return fetchApi(`/quotes/${id}`, {
    method: 'DELETE',
  });
}
