import React from 'react';

export interface StatsData {
  wordsLearned: number;
  quizAccuracy: number;
  streakDays: number;
}

interface CoreStatsGridProps {
  stats: StatsData;
}

export default function CoreStatsGrid({ stats }: CoreStatsGridProps) {
  return (
    <div className="grid grid-cols-3 gap-[10px] w-full">
      {/* 카드 1: 누적 단어 */}
      <div className="bg-white border border-[#E5E5E5] rounded-[20px] shadow-none flex flex-col items-center justify-center py-[12px] px-[8px]">
        <span className="text-[#666666] text-[11px] font-normal mb-[4px]">학습 단어</span>
        <span className="text-primary text-[18px] font-bold">{stats.wordsLearned}개</span>
      </div>
      
      {/* 카드 2: 퀴즈 정답률 */}
      <div className="bg-white border border-[#E5E5E5] rounded-[20px] shadow-none flex flex-col items-center justify-center py-[12px] px-[8px]">
        <span className="text-[#666666] text-[11px] font-normal mb-[4px]">퀴즈 정답률</span>
        <span className="text-primary text-[18px] font-bold">{stats.quizAccuracy}%</span>
      </div>

      {/* 카드 3: 연속 학습 */}
      <div className="bg-white border border-[#E5E5E5] rounded-[20px] shadow-none flex flex-col items-center justify-center py-[12px] px-[8px]">
        <span className="text-[#666666] text-[11px] font-normal mb-[4px]">연속 학습</span>
        <span className="text-primary text-[18px] font-bold">{stats.streakDays}일</span>
      </div>
    </div>
  );
}
