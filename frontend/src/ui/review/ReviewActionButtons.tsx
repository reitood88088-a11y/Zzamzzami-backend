import React from 'react';
import { Check, RotateCw, X } from 'lucide-react';

interface ReviewActionButtonsProps {
  onActionClick: (status: 'KNOW' | 'AGAIN' | 'DONT_KNOW') => void;
}

export default function ReviewActionButtons({ onActionClick }: ReviewActionButtonsProps) {
  return (
    <div className="absolute bottom-[24px] right-[24px] z-40 flex flex-col gap-[24px] pointer-events-none">
      
      {/* 알아요 (Know it) */}
      <div className="flex flex-col items-center gap-[6px] pointer-events-auto">
        <button 
          onClick={() => onActionClick('KNOW')}
          className="w-[48px] h-[48px] rounded-full bg-[#529D6E] flex items-center justify-center shadow-none active:scale-95 transition-transform"
        >
          <Check size={24} color="#FFFFFF" strokeWidth={3} />
        </button>
        <span className="text-[#666666] text-[12px] font-medium">알아요</span>
      </div>

      {/* 한번 더 (Review) */}
      <div className="flex flex-col items-center gap-[6px] pointer-events-auto">
        <button 
          onClick={() => onActionClick('AGAIN')}
          className="w-[48px] h-[48px] rounded-full bg-[#9D8452] flex items-center justify-center shadow-none active:scale-95 transition-transform"
        >
          <RotateCw size={22} color="#FFFFFF" strokeWidth={2.5} />
        </button>
        <span className="text-[#666666] text-[12px] font-medium">한번더</span>
      </div>

      {/* 몰라요 (Don't Know) */}
      <div className="flex flex-col items-center gap-[6px] pointer-events-auto">
        <button 
          onClick={() => onActionClick('DONT_KNOW')}
          className="w-[48px] h-[48px] rounded-full bg-[#9D5252] flex items-center justify-center shadow-none active:scale-95 transition-transform"
        >
          <X size={24} color="#FFFFFF" strokeWidth={3} />
        </button>
        <span className="text-[#666666] text-[12px] font-medium">몰라요</span>
      </div>

    </div>
  );
}
