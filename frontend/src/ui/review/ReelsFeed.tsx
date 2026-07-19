"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import StudyCard, { StudyItem } from './StudyCard';
import ReviewActionButtons from './ReviewActionButtons';
import { getReviewWords, updateWordStatus } from '../../api/client';
import { useStudyTimeTracker } from '../../hooks/useStudyTimeTracker';

export default function ReelsFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQueue, setCurrentQueue] = useState<StudyItem[]>([]);
  const [allWords, setAllWords] = useState<StudyItem[]>([]); // 원본 전체 단어 보관
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [cycleCount, setCycleCount] = useState(1);
  const [sessionDone, setSessionDone] = useState(false); // 한 세션 완료 여부
  
  // 절대 꼬이지 않도록 레퍼런스로 관리
  const isProcessingRef = useRef(false);
  const nextQueueRef = useRef<StudyItem[]>([]);

  // 현재 보고 있는 카드의 언어를 트래킹
  const currentLanguage = currentQueue.length > 0 ? (currentQueue[currentIndex]?.language as 'English' | 'Chinese' | 'Japanese') : null;
  useStudyTimeTracker(currentLanguage);

  // 단어 로드 함수 (초기 로드 + 재시작 모두 사용)
  const loadReviews = useCallback(async () => {
    setLoading(true);
    setSessionDone(false);
    setCurrentIndex(0);
    setCycleCount(1);
    nextQueueRef.current = [];
    isProcessingRef.current = false;

    try {
      const res = await getReviewWords(); // Fetch all languages
      
      // 중복 방지를 위한 Map
      const uniqueWords = new Map<string, StudyItem>();
      res.data.forEach((w: any) => {
        if (!uniqueWords.has(w.word.toLowerCase().trim())) {
          uniqueWords.set(w.word.toLowerCase().trim(), {
            id: w.wordId,
            originalId: w.wordId,
            language: w.subject || 'English',
            timestamp: 'Just now',
            word: w.word,
            reading: w.reading || '',
            meaning: w.meaning,
            example: w.exampleSentence || ''
          });
        }
      });
      
      const mapped = Array.from(uniqueWords.values());
      setAllWords(mapped);
      setCurrentQueue(mapped);
    } catch (err) {
      console.error('Failed to load review words', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 마운트 시 단어 로드 (탭 재진입마다 실행됨)
  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // 세션 완료 후 "다시 복습하기" — 원본 단어 전체로 재시작
  const handleRestart = () => {
    if (allWords.length === 0) return;
    nextQueueRef.current = [];
    isProcessingRef.current = false;
    // 각 단어에 새 렌더링 키 부여해서 React가 새 카드로 인식하게
    const freshWords = allWords.map(w => ({
      ...w,
      id: `${w.originalId}-restart-${Date.now()}-${Math.random()}`
    }));
    flushSync(() => {
      setSessionDone(false);
      setCycleCount(1);
      setCurrentIndex(0);
      setCurrentQueue(freshWords);
    });
    containerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  };

  const showToastMessage = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 2500);
  };

  const handleActionClick = (status: 'KNOW' | 'AGAIN' | 'DONT_KNOW') => {
    if (!containerRef.current || currentQueue.length === 0) return;
    if (isProcessingRef.current) return;
    
    isProcessingRef.current = true;
    
    const currentWord = currentQueue[currentIndex];
    
    // 비동기 통신 - 통계/대시보드 기록용
    const originalWordId = currentWord.originalId;
    updateWordStatus(originalWordId, status).catch(console.error);

    // 한번더/몰라요 이면 다음 사이클 대기열(Ref)에 즉시 푸시
    if (status === 'AGAIN' || status === 'DONT_KNOW') {
      nextQueueRef.current.push({ 
        ...currentWord, 
        id: `${originalWordId}-${Date.now()}` // 고유 렌더링 키
      });
    }

    // 현재 사이클의 마지막 카드인지 체크
    if (currentIndex >= currentQueue.length - 1) {
      if (nextQueueRef.current.length === 0) {
        // 모든 단어 처리 완료 → 세션 완료 상태로 전환
        setSessionDone(true);
        setCurrentQueue([]);
        isProcessingRef.current = false;
        return;
      } else {
        const nextCycleNum = cycleCount + 1;
        const nextCycleWords = [...nextQueueRef.current];
        
        // 다음 큐 비우기
        nextQueueRef.current = [];
        
        // 화면을 강제로 즉시 업데이트 (flushSync)
        flushSync(() => {
          setCycleCount(nextCycleNum);
          setCurrentQueue(nextCycleWords);
          setCurrentIndex(0);
          setToastMsg(`${nextCycleNum}번째 복습 사이클이 시작되었습니다!`);
        });

        // 렌더링 직후 곧바로 맨 위로 스크롤 이동
        containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
        
        // 자동 닫힘 타이머
        setTimeout(() => setToastMsg(null), 2500);
        
        // 아주 짧은 락 해제 타임
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 100);
        return;
      }
    }

    // 다음 카드로 스무스 스크롤 이동
    const nextIndex = currentIndex + 1;
    const cardHeight = containerRef.current.offsetHeight; 
    
    containerRef.current.scrollTo({
      top: cardHeight * nextIndex,
      behavior: 'smooth'
    });

    setCurrentIndex(nextIndex);
    
    // 스크롤 애니메이션 동안 클릭 방지
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 400); 
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#999] bg-[#F7F4EE] w-full h-full">
        단어를 불러오는 중...
      </div>
    );
  }

  // 세션 완료 화면 (다시 복습하기 버튼 포함)
  if (sessionDone || currentQueue.length === 0) {
    const hasWords = allWords.length > 0;
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#F7F4EE] w-full h-full relative gap-6 px-8">
        {toastMsg && (
          <div className="absolute top-10 bg-black/70 text-white px-6 py-2 rounded-full text-sm shadow-md transition-opacity duration-300 z-50">
            {toastMsg}
          </div>
        )}

        {/* 완료 메시지 */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-[48px]">🎉</span>
          <p className="text-[#1A1A1A] text-[20px] font-bold leading-[1.35] tracking-[-0.3px]">
            {hasWords ? '오늘 복습 완료!' : '오늘 복습할 단어가 없어요'}
          </p>
          <p className="text-[#888] text-[15px] font-normal leading-[1.5]">
            {hasWords
              ? '모든 단어를 훑었어요.\n처음부터 다시 복습할 수 있어요!'
              : '새 문서를 스캔하면\n단어가 여기 나타나요.'}
          </p>
        </div>

        {/* 다시 복습하기 버튼 */}
        {hasWords && (
          <button
            onClick={handleRestart}
            className="w-full max-w-[280px] h-[52px] bg-primary rounded-full flex items-center justify-center text-white text-[17px] font-semibold tracking-[-0.2px] shadow-md active:scale-95 transition-transform"
          >
            다시 복습하기
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex-1 overflow-hidden bg-[#F7F4EE]">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-2 rounded-full text-sm shadow-md z-50 transition-opacity duration-300">
          {toastMsg}
        </div>
      )}

      {/* 세로 스크롤을 막고(overflow-hidden), JS로만 스크롤 제어 */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-hidden"
      >
        {currentQueue.map((item) => (
          <div key={item.id} className="w-full h-full flex flex-col justify-center shrink-0">
            <StudyCard item={item} />
          </div>
        ))}
      </div>

      {/* 우측 하단 플로팅 액션 버튼 그룹 */}
      <ReviewActionButtons onActionClick={handleActionClick} />
    </div>
  );
}

