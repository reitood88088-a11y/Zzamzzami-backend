import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Diary } from '../../data/mockDiaries';

interface DiaryCardProps {
  diary: Diary;
}

export default function DiaryCard({ diary }: DiaryCardProps) {
  // 언어별 Spine 색상 지정
  const getSpineColorClass = (subject: Diary['subject']) => {
    switch (subject) {
      case 'English':
        return 'bg-primary'; // #83539D
      case 'Chinese':
        return 'bg-[#E88B81]';
      case 'Japanese':
        return 'bg-[#7BBA9B]';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <Link href={`/home/${diary.subject.toLowerCase()}?date=${diary.date}`} className="block">
      <div
        className={clsx(
          "relative flex-shrink-0 w-[130px] h-[160px] bg-white overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,0.03)] cursor-pointer",
          // 모서리 둥글기 비대칭 (4px 16px 16px 4px)
          "rounded-l-[4px] rounded-r-[16px]",
        // NEW 뱃지가 있으면 보라색 보더 추가
        diary.isNew ? "border-2 border-primary" : "border border-[#E5E5E5]"
      )}
    >
      {/* 왼쪽 책등(Spine) 및 책 주름 효과 */}
      <div className={clsx("absolute top-0 left-0 w-[14px] h-full", getSpineColorClass(diary.subject))} />
      <div className="absolute top-0 left-[14px] w-[1px] h-full bg-black/10" />

      {/* 내부 콘텐츠 (패딩) */}
      <div className="pl-[24px] pr-3 py-3 w-full h-full flex flex-col justify-between">
        
        {/* 상단 레이아웃 (날짜 및 NEW 뱃지) */}
        <div className="flex items-start justify-between">
          <span className="text-[#1A1A1A] text-[28px] font-bold tracking-[-1.0px] leading-none">
            {diary.date}
          </span>
          {diary.isNew && (
            <div className="bg-[#FFD700] px-[4px] py-[2px] rounded-full">
              <span className="text-[#1A1A1A] text-[8px] font-[900] leading-none block">NEW</span>
            </div>
          )}
        </div>

        {/* 하단 콘텐츠 요약 */}
        <p className="text-[#666666] text-[13px] font-normal leading-normal line-clamp-3">
          {diary.contentSnippet}
        </p>
      </div>
    </div>
    </Link>
  );
}
