import React from 'react';

interface StoryProgressBarProps {
  totalSegments: number;
  currentIndex: number;
  isShowingInsight: boolean;
}

export default function StoryProgressBar({ totalSegments, currentIndex, isShowingInsight }: StoryProgressBarProps) {
  return (
    <div className="flex w-full gap-[4px] h-[4px]">
      {Array.from({ length: totalSegments }).map((_, i) => {
        let bgStyle = {};
        
        if (i < currentIndex) {
          // 이미 지나간 문제 (완전 채워짐)
          bgStyle = { backgroundColor: '#83539D' };
        } else if (i === currentIndex) {
          if (isShowingInsight) {
            // 현재 문제 해설 보기 중 (완전 채워짐)
            bgStyle = { backgroundColor: '#83539D' };
          } else {
            // 현재 문제 푸는 중 (절반 채워짐)
            // 좌측 50%는 보라색, 우측 50%는 회색
            bgStyle = { background: 'linear-gradient(to right, #83539D 50%, #D9D9D9 50%)' };
          }
        } else {
          // 아직 도달하지 않은 문제 (안 채워짐)
          bgStyle = { backgroundColor: '#D9D9D9' };
        }

        return (
          <div 
            key={`segment-${i}`} 
            className="flex-1 rounded-[50px] transition-all duration-300"
            style={bgStyle}
          />
        );
      })}
    </div>
  );
}
