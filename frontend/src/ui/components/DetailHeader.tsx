"use client";

import React from 'react';
import { ChevronLeft, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DetailHeader() {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full sm:absolute sm:top-0 sm:left-0 z-50 bg-primary flex flex-col shadow-none border-none">

      {/* 글로벌 헤더 (Header) */}
      <header className="flex justify-between items-center py-[16px] px-[24px]">
        {/* 왼쪽: 뒤로 가기 버튼 */}
        <button 
          onClick={() => router.back()}
          className="text-white flex items-center justify-center w-[28px] h-[28px]"
        >
          <ChevronLeft size={28} />
        </button>

        {/* 가운데: 앱 타이틀 */}
        <h1 className="text-white text-[22px] font-[800] tracking-[-1.0px] leading-normal absolute left-1/2 transform -translate-x-1/2">
          짬짬이
        </h1>

        {/* 오른쪽: 프로필 버튼 */}
        <button className="w-[36px] h-[36px] rounded-full border-2 border-white flex items-center justify-center bg-transparent text-white">
          <User size={18} />
        </button>
      </header>
    </div>
  );
}
