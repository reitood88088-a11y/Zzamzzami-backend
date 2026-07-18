"use client";

import React, { useRef, useState, useEffect } from 'react';
import StudyCard, { StudyItem } from './StudyCard';
import ReviewActionButtons from './ReviewActionButtons';
import { getReviewWords, updateWordStatus } from '../../api/client';

export default function ReelsFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQueue, setCurrentQueue] = useState<StudyItem[]>([]);
  const [nextQueue, setNextQueue] = useState<StudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await getReviewWords('English'); // Hardcode subject for now
        const mapped: StudyItem[] = res.data.map((w: any) => ({
          id: w.wordId,
          language: 'English',
          timestamp: 'Just now',
          word: w.word,
          meaning: w.meaning,
          example: w.exampleSentence || ''
        }));
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
    }, 2000);
  };

  const handleActionClick = (status: 'KNOW' | 'AGAIN' | 'DONT_KNOW') => {
    if (!containerRef.current || currentQueue.length === 0) return;
    if (isProcessingRef.current) return;
    
    isProcessingRef.current = true;
    
    const currentWord = currentQueue[currentIndex];
    
    // 비동기 통신 (화면 전환을 막지 않음)
    updateWordStatus(currentWord.id, status).catch(console.error);

    let updatedNextQueue = nextQueue;
    // 한번더, 몰라요의 경우 다음 큐에 추가
    if (status === 'AGAIN' || status === 'DONT_KNOW') {
      updatedNextQueue = [...nextQueue, currentWord];
      setNextQueue(updatedNextQueue);
    }

    // 마지막 카드 처리
    if (currentIndex >= currentQueue.length - 1) {
      if (updatedNextQueue.length === 0) {
        showToastMessage("모든 복습을 완료했습니다!");
        setCurrentQueue([]); // 모두 완료됨
        isProcessingRef.current = false;
        return;
      } else {
        showToastMessage("다음 복습 사이클을 시작합니다!");
        setCurrentQueue(updatedNextQueue);
        setNextQueue([]);
        setCurrentIndex(0);
        // 즉시 맨 위로 스크롤 리셋
        containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 100);
        return;
      }
    }

    // 다음 카드로 이동
    const nextIndex = currentIndex + 1;
    const cardHeight = containerRef.current.offsetHeight; 
    
    // 스무스 스크롤 이동
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
      {/* 사용자는 수동으로 스크롤할 수 없고 반드시 하단 버튼을 클릭해야 넘어감 */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-hidden snap-y snap-mandatory pb-[40px] pt-[20px]"
      >
        {currentQueue.map((item, idx) => (
          <div key={item.id + '-' + idx} className="w-full h-full snap-center flex flex-col justify-center shrink-0">
            <StudyCard item={item} />
          </div>
        ))}
      </div>

      {/* 우측 하단 플로팅 액션 버튼 그룹 */}
      <ReviewActionButtons onActionClick={handleActionClick} />
    </div>
  );
}
