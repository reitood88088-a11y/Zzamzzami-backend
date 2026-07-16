"use client";

import React, { useRef, useState, useEffect } from 'react';
import StudyCard, { StudyItem } from './StudyCard';
import ReviewActionButtons from './ReviewActionButtons';
import { getReviewWords, updateWordStatus } from '../../api/client';

export default function ReelsFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<StudyItem[]>([]);
  const [loading, setLoading] = useState(true);

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
        setReviews(mapped);
      } catch (err) {
        console.error('Failed to load review words', err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  const handleActionClick = (status: 'KNOW' | 'AGAIN' | 'DONT_KNOW') => {
    if (!containerRef.current || reviews.length === 0) return;
    
    // 비동기 통신 (화면 전환을 막지 않음)
    const currentWordId = reviews[currentIndex].id;
    updateWordStatus(currentWordId, status).catch(console.error);

    // 마지막 카드 처리
    if (currentIndex >= reviews.length - 1) {
      alert("모든 복습을 완료했습니다!");
      return;
    }

    const nextIndex = currentIndex + 1;
    const cardHeight = containerRef.current.offsetHeight; 
    
    // 스무스 스크롤 이동
    containerRef.current.scrollTo({
      top: cardHeight * nextIndex,
      behavior: 'smooth'
    });

    setCurrentIndex(nextIndex);
  };

  const handleScroll = () => {
    if (!containerRef.current || reviews.length === 0) return;
    const scrollTop = containerRef.current.scrollTop;
    const cardHeight = containerRef.current.offsetHeight;
    const newIndex = Math.round(scrollTop / cardHeight);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < reviews.length) {
      setCurrentIndex(newIndex);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#999] bg-[#F7F4EE] w-full h-full">
        단어를 불러오는 중...
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#999] bg-[#F7F4EE] w-full h-full">
        오늘 복습할 단어가 없습니다! 🎉
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex-1 overflow-hidden bg-[#F7F4EE]">
      {/* 세로 스크롤 & 스냅 속성이 적용된 피드 컨테이너 */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-auto snap-y snap-mandatory no-scrollbar pb-[40px] pt-[20px]"
      >
        {reviews.map((item, idx) => (
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
