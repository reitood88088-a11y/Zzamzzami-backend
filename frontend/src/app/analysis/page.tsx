import React from 'react';
import GlobalHeader from '../../ui/components/GlobalHeader';
import BottomNav from '../../ui/components/BottomNav';
import AnalysisClient from '../../ui/analysis/AnalysisClient';

export default function AnalysisPage() {
  return (
    <div className="relative w-full h-full bg-[#F7F4EE] flex flex-col overflow-hidden">
      {/* 1. 상단 글로벌 헤더 (고정) */}
      <GlobalHeader />

      {/* 2. 중앙 분석 클라이언트 영역 (헤더 높이만큼 마진, 남은 공간 차지, 내부 스크롤) */}
      <div className="flex-1 flex flex-col mt-[60px] mb-[80px] overflow-hidden">
        <AnalysisClient />
      </div>

      {/* 3. 하단 네비게이션 (고정) */}
      <BottomNav />
    </div>
  );
}
