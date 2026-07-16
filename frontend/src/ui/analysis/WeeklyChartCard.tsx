import React from 'react';

interface ChartData {
  day: string;  // e.g. "mon."
  value: number; // 0 ~ 100
}

interface WeeklyChartCardProps {
  data: ChartData[];
}

export default function WeeklyChartCard({ data }: WeeklyChartCardProps) {
  // 간단한 바 차트 구현
  // 가장 높은 값을 기준으로 비율을 계산하여 막대 높이 설정
  const maxValue = Math.max(...data.map(d => d.value), 10);

  return (
    <div className="w-full bg-white border border-[#E5E5E5] rounded-[20px] shadow-none p-[16px] flex flex-col">
      <h3 className="text-[#1A1A1A] text-[15px] font-bold mb-[16px]">주간 학습량</h3>
      
      <div className="flex justify-between items-end h-[100px] w-full">
        {data.map((item, idx) => {
          const heightPercent = (item.value / maxValue) * 100;
          const isActive = item.value > 0;
          
          return (
            <div key={idx} className="flex flex-col items-center justify-end h-full gap-[8px]">
              {/* 막대 그래프 컨테이너 */}
              <div className="w-[24px] h-[100px] flex items-end justify-center">
                <div 
                  className={`w-full rounded-[4px] transition-all duration-500 ease-out ${isActive ? 'bg-primary' : 'bg-[#E5E5E5]'}`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              {/* X축 요일 라벨 */}
              <span className="text-[#666666] text-[12px] font-normal">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
