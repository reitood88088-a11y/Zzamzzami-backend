"use client";

import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { deleteDiary } from '../../api/client';

interface DetailViewClientProps {
  subject: string;
  diaries: any[];
  initialDate?: string;
}

export default function DetailViewClient({ subject, diaries, initialDate }: DetailViewClientProps) {
  // 날짜별로 그룹핑 (고유 날짜 목록 추출)
  const uniqueDates = Array.from(new Set(diaries.map(d => d.date)));
  
  // initialDate가 전달되었다면 해당 날짜의 인덱스를 찾고, 없으면 0번째 인덱스 사용
  const initialIndex = initialDate ? uniqueDates.indexOf(initialDate) : 0;
  const startIndex = initialIndex >= 0 ? initialIndex : 0;

  const [activeDateIndex, setActiveDateIndex] = useState(startIndex);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const activeDate = uniqueDates[activeDateIndex];
  
  // 현재 선택된 날짜에 속하는 다이어리들만 필터링
  const activeDiaries = diaries.filter(d => d.date === activeDate);

  // 스크롤 동기화를 위한 refs
  const storyListRef = useRef<HTMLDivElement>(null);
  const feedListRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 마운트 시, 활성 날짜(스토리 링)로 스크롤 이동
  useEffect(() => {
    if (storyListRef.current && uniqueDates.length > 0) {
      // 약간의 지연을 주어 렌더링 후 이동
      setTimeout(() => {
        const ringElement = storyListRef.current?.children[activeDateIndex] as HTMLElement;
        ringElement?.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
      }, 50);
    }
  }, [activeDateIndex, uniqueDates.length]);

  // 날짜(스토리 링)가 바뀔 때마다 피드 스크롤을 맨 앞으로 초기화
  useEffect(() => {
    if (feedListRef.current) {
      feedListRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
    setActiveCardIndex(0);
  }, [activeDateIndex]);

  // 스토리 링 클릭 시 해당 날짜로 변경
  const handleStoryClick = (index: number) => {
    setActiveDateIndex(index);
  };

  // 피드 카드를 스와이프할 때 현재 날짜 내의 카드 인덱스 업데이트 (페이지네이션용)
  const handleFeedScroll = () => {
    if (!feedListRef.current) return;
    
    const scrollLeft = feedListRef.current.scrollLeft;
    const cardWidth = feedListRef.current.offsetWidth * 0.88; 
    const itemWidth = cardWidth + 16;
    const newIndex = Math.round(scrollLeft / itemWidth);
    
    if (newIndex !== activeCardIndex && newIndex >= 0 && newIndex < activeDiaries.length) {
      setActiveCardIndex(newIndex);
    }
  };

  const handleDeleteClick = async (diaryId: string) => {
    if (confirm('이 다이어리를 정말 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.')) {
      setIsDeleting(true);
      try {
        await deleteDiary(diaryId);
        // 삭제 성공 시 홈 화면으로 이동하거나 라우터 새로고침
        router.push('/home');
        router.refresh();
      } catch (error) {
        console.error('Failed to delete diary:', error);
        alert('삭제에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (diaries.length === 0) {
    return (
      <div className="w-full h-full bg-[#F7F4EE] flex flex-col pt-[60px] pb-[80px] items-center justify-center">
        <p className="text-[#999]">스캔된 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#F7F4EE] flex flex-col pt-[60px] pb-[80px]">
      
      {/* 1. 스토리 링 영역 (고유 날짜 목록) */}
      <div 
        ref={storyListRef}
        className="story-date-container flex gap-[14px] px-[32px] py-[24px] overflow-x-auto snap-x snap-mandatory no-scrollbar"
      >
        {uniqueDates.map((date, index) => {
          const isActive = index === activeDateIndex;
          return (
            <button
              key={`story-${date}`}
              onClick={() => handleStoryClick(index)}
              className="flex flex-col items-center gap-1 snap-center flex-shrink-0"
            >
              <div 
                className={clsx(
                  "w-[60px] h-[60px] rounded-full border-[2px] flex items-center justify-center transition-colors",
                  isActive 
                    ? "border-primary bg-white" 
                    : "border-[#E5E5E5] bg-[#F2F2F2]"
                )}
              >
                <span className={clsx(
                  "text-[15px] font-bold",
                  isActive ? "text-primary" : "text-[#666666]"
                )}>
                  {date}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. 피드 카드 영역 (현재 선택된 날짜의 카드들만 표시) */}
      <div 
        ref={feedListRef}
        onScroll={handleFeedScroll}
        className="feed-carousel flex gap-[16px] px-[24px] pb-[16px] overflow-x-auto snap-x snap-mandatory no-scrollbar flex-1"
      >
        {activeDiaries.map((diary) => (
          <div 
            key={`feed-${diary.id}`}
            className="flex-shrink-0 w-[88%] h-[380px] bg-white border border-[#E5E5E5] rounded-[24px] p-[24px] snap-center overflow-y-auto no-scrollbar shadow-none relative"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-primary text-[14px] font-bold tracking-[0.5px] uppercase mt-1">
                {diary.subject}
              </h2>
              <button
                onClick={() => handleDeleteClick(diary.id)}
                disabled={isDeleting}
                className="p-2 -mt-2 -mr-2 text-[#999999] hover:text-[#FF3B30] hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                title="삭제"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <p className="text-[#1A1A1A] text-[20px] font-normal leading-[1.6] whitespace-pre-wrap">
              {diary.fullText}
            </p>
          </div>
        ))}
        {/* 카드가 여러 개일 때 Peeking UI 여백 */}
        {activeDiaries.length > 1 && (
          <div className="w-[1px] flex-shrink-0"></div>
        )}
      </div>

      {/* 3. 페이지네이션 닷 (현재 날짜 내의 카드 개수만큼 표시) */}
      {activeDiaries.length > 1 ? (
        <div className="flex justify-center items-center gap-[6px] pb-[32px] h-[38px]">
          {activeDiaries.map((_, index) => (
            <div 
              key={`dot-${index}`}
              className={clsx(
                "w-[6px] h-[6px] rounded-full transition-colors",
                index === activeCardIndex ? "bg-primary" : "bg-[#D9D9D9]"
              )}
            />
          ))}
        </div>
      ) : (
        <div className="pb-[32px] h-[38px]"></div>
      )}
      
    </div>
  );
}
