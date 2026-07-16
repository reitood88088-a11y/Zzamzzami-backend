import React from 'react';
import { Clock } from 'lucide-react';

interface TimeInsightBubbleProps {
  hoursSaved: number;
}

export default function TimeInsightBubble({ hoursSaved }: TimeInsightBubbleProps) {
  return (
    <div className="w-full bg-[#E5DEFA] border border-primary rounded-[16px] p-[16px] shadow-none flex items-center gap-[12px]">
      {/* 시계/타이머 아이콘 (사용자 요청에 따라 시간 절약을 직관적으로 표현) */}
      <div className="flex-shrink-0 w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center border border-primary/20">
        <Clock className="text-primary" size={18} strokeWidth={2.5} />
      </div>
      
      <p className="text-[#1A1A1A] text-[14px] font-semibold leading-[1.4]">
        이번 주 자투리 시간을 언어 학습에 <span className="text-primary font-bold">{hoursSaved}시간</span> 사용했어요!
      </p>
    </div>
  );
}
