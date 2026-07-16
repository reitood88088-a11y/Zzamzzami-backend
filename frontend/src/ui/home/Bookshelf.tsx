import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Diary } from '../../data/mockDiaries';
import DiaryCard from './DiaryCard';

interface BookshelfProps {
  subject: string;
  diaries: Diary[];
  isEven: boolean;
}

export default function Bookshelf({ subject, diaries, isEven }: BookshelfProps) {
  if (diaries.length === 0) return null;

  return (
    <div
      className={clsx(
        "py-8 flex flex-col gap-4 border-b border-[#E5E5E5]",
        isEven ? "bg-[#F7F4EE]" : "bg-transparent"
      )}
    >
      {/* 상단 뱃지 헤더 */}
      <div className="px-6">
        <Link href={`/home/${subject.toLowerCase()}`}>
          <span className="inline-block px-4 py-1 rounded-[50px] border-2 border-[#1A1A1A] text-[#1A1A1A] text-[16px] font-bold uppercase tracking-[0.5px] cursor-pointer">
            {subject}
          </span>
        </Link>
      </div>

      {/* 책 리스트 가로 스와이프 (Peeking UI 적용) */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-2 no-scrollbar">
        {diaries.map((diary) => (
          <div key={diary.id} className="snap-start snap-always">
            <DiaryCard diary={diary} />
          </div>
        ))}
        {/* 마지막 카드 우측 여백 (Peeking UI 확보를 위함) */}
        <div className="w-[8px] flex-shrink-0" />
      </div>
    </div>
  );
}
