import React from 'react';

export interface StudyItem {
  id: string;
  originalId: string;
  language: string;
  timestamp: string;
  word: string;
  reading: string;  // 한어병음(중국어) 또는 히라가나(일본어)
  meaning: string;
  example: string;
}

interface StudyCardProps {
  item: StudyItem;
}

export default function StudyCard({ item }: StudyCardProps) {
  // reading 필드를 우선 사용, 없으면 word에서 괄호 패턴 파싱 (기존 데이터 호환)
  let mainWord = item.word;
  let reading = item.reading || "";
  
  if (!reading) {
    // Fallback: 기존 "汉字 (hàn zì)" 형식 파싱 (반각/전각 괄호 모두 지원)
    const match = item.word.match(/^(.*?)\s*[（(](.*?)[）)]\s*$/);
    if (match) {
      mainWord = match[1].trim();
      reading = match[2].trim();
    }
  }

  return (
    <div className="w-[calc(100%-48px)] h-[calc(100%-40px)] mx-auto bg-white border border-[#E5E5E5] rounded-[24px] shadow-none flex flex-col relative snap-center flex-shrink-0 overflow-hidden">
      
      {/* 텍스트 내용 컨테이너 (우측 버튼영역 확보를 위해 padding-right 크게 줌, 내용 넘치면 내부 세로 스크롤) */}
      <div className="w-full h-full p-[24px] pr-[60px] overflow-y-auto no-scrollbar relative flex flex-col">
        
        {/* 상단 배지 및 시간 표시 */}
        <div className="flex flex-col gap-2 mb-8">
          <span className="inline-flex w-fit items-center justify-center bg-[#E5DEFA] text-primary text-[14px] font-bold px-[14px] py-[6px] rounded-[50px] uppercase tracking-[0.5px]">
            {item.language}
          </span>
          <span className="text-[#666666] text-[14px] font-medium">
            {item.timestamp}
          </span>
        </div>

        {/* 메인 학습 컨텐츠 */}
        <div className="flex flex-col gap-4 mt-auto mb-auto">
          <div className="flex flex-col gap-1">
            <h2 className="text-primary text-[28px] font-bold leading-[1.25] tracking-[-0.3px]">
              {mainWord}
            </h2>
            {reading && (
              <span className="text-[#888888] text-[18px] font-medium leading-[1.2]">
                {reading}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-[#1A1A1A] text-[18px] font-normal leading-[1.45] tracking-[-0.2px]">
              {item.meaning}
            </p>
            <p className="text-[#666666] text-[18px] font-normal leading-[1.45] tracking-[-0.2px] italic">
              "{item.example}"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
