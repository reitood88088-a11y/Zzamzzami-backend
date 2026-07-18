"use client";

import React, { useRef, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import StudyCard, { StudyItem } from './StudyCard';
import ReviewActionButtons from './ReviewActionButtons';
import { getReviewWords, updateWordStatus } from '../../api/client';

export default function ReelsFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQueue, setCurrentQueue] = useState<StudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [cycleCount, setCycleCount] = useState(1);
  
  // 절대 꼬이지 않도록 레퍼런스로 관리
  const isProcessingRef = useRef(false);
  const nextQueueRef = useRef<StudyItem[]>([]);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await getReviewWords('English'); // Hardcode subject for now
        
        // 중복 방지를 위한 Map (단어 뜻 동일하면 하나만)
        const uniqueWords = new Map<string, StudyItem>();
        res.data.forEach((w: any) => {
          if (!uniqueWords.has(w.word.toLowerCase().trim())) {
            uniqueWords.set(w.word.toLowerCase().trim(), {
              id: w.wordId,
              originalId: w.wordId,
              language: 'English',
              timestamp: 'Just now',
              word: w.word,
              meaning: w.meaning,
              example: w.exampleSentence || ''
            });
          }
        });
        
        const mapped = Array.from(uniqueWords.values());
        setCurrentQueue(mapped);
      } catch (err) {
        console.error('Failed to load review words', err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

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
    
    // 비동기 통신 - 원본 ID 사용
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
        showToastMessage("모든 복습을 완료했습니다! 🎉");
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

  if (currentQueue.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-[#999] bg-[#F7F4EE] w-full h-full relative">
        {toastMsg && (
          <div className="absolute top-10 bg-black/70 text-white px-6 py-2 rounded-full text-sm shadow-md transition-opacity duration-300 z-50">
            {toastMsg}
          </div>
        )}
        오늘 복습할 단어가 없습니다! 🎉
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
