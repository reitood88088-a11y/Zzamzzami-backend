"use client";

import React, { useRef, useState, useEffect } from 'react';
import StudyCard, { StudyItem } from './StudyCard';
import ReviewActionButtons from './ReviewActionButtons';
import { getReviewWords, updateWordStatus } from '../../api/client';

export default function ReelsFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQueue, setCurrentQueue] = useState<StudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const isProcessingRef = useRef(false);

  // 사이클 트래킹용 상태
  const [cycleCount, setCycleCount] = useState(1);
  const [cycleEndIndex, setCycleEndIndex] = useState(-1);

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
        setCycleEndIndex(mapped.length - 1);
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
    
    // 비동기 통신 (화면 전환을 막지 않음)
    // 원래의 단어 ID를 추출하기 위해 - 원본 ID 사용
    const originalWordId = currentWord.originalId;
    updateWordStatus(originalWordId, status).catch(console.error);

    let newQueue = currentQueue;
    // 한번더, 몰라요의 경우 큐의 맨 끝에 카드를 덧붙임 (고유 ID 할당)
    if (status === 'AGAIN' || status === 'DONT_KNOW') {
      const duplicatedWord = { 
        ...currentWord, 
        id: `${originalWordId}-${Date.now()}` 
      };
      newQueue = [...currentQueue, duplicatedWord];
      setCurrentQueue(newQueue);
    }

    // 1. 모든 복습이 완료되었는지 체크
    if (currentIndex >= newQueue.length - 1) {
      showToastMessage("모든 복습을 완료했습니다! 🎉");
      setTimeout(() => {
        setCurrentQueue([]);
        isProcessingRef.current = false;
      }, 500);
      return;
    }

    // 2. 현재 사이클의 마지막 카드를 방금 처리했는지 체크
    if (currentIndex === cycleEndIndex) {
      const nextCycle = cycleCount + 1;
      setCycleCount(nextCycle);
      setCycleEndIndex(newQueue.length - 1); // 다음 사이클의 마지막 인덱스 업데이트
      
      // 스크롤이 도착하는 시점(400ms)에 맞추어 토스트 띄우기
      setTimeout(() => {
        showToastMessage(`${nextCycle}번째 복습 사이클이 시작되었습니다!`);
      }, 400);
    }

    // 3. 다음 카드로 스크롤 이동
    const nextIndex = currentIndex + 1;
    const cardHeight = containerRef.current.offsetHeight; 
    
    containerRef.current.scrollTo({
      top: cardHeight * nextIndex,
      behavior: 'smooth'
    });

    setCurrentIndex(nextIndex);
    
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 400); // 스크롤 애니메이션 동안 클릭 방지
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

      {/* 세로 스크롤을 막고(overflow-hidden), 스냅 속성을 유지하는 컨테이너 */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-hidden snap-y snap-mandatory pb-[40px] pt-[20px]"
      >
        {currentQueue.map((item) => (
          <div key={item.id} className="w-full h-full snap-center flex flex-col justify-center shrink-0">
            <StudyCard item={item} />
          </div>
        ))}
      </div>

      {/* 우측 하단 플로팅 액션 버튼 그룹 */}
      <ReviewActionButtons onActionClick={handleActionClick} />
    </div>
  );
}
