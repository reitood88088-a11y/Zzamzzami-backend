"use client";

import React from 'react';
import { Zap, Image as ImageIcon } from 'lucide-react';

export default function CameraViewport() {
  return (
    <div className="relative flex-1 bg-[#333333] w-full flex items-center justify-center overflow-hidden">
      
      {/* 컷아웃(Cut-out) 오버레이 효과 - 테두리 부분만 어둡게 처리 */}
      {/* 바깥쪽 어두운 오버레이 레이어 (CSS border 기법을 사용해 가운데 투명 컷아웃을 구현) */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          borderWidth: '20vh 12.5vw', // 화면 비율에 맞춘 근사치 테두리 두께 (상하 20%, 좌우 12.5% = 중앙에 대략 너비 75%, 높이 60% 공간 생성)
          borderColor: 'rgba(0,0,0,0.3)',
          borderStyle: 'solid'
        }}
      />

      {/* 포커스 프레임 (가운데 타겟 영역) */}
      <div className="absolute w-[75%] h-[60%] border-[2px] border-[rgba(255,255,255,0.8)] rounded-[8px] z-20 pointer-events-none overflow-hidden">
        {/* 스캔 애니메이션 라인 */}
        <div className="absolute left-0 w-full h-[2px] bg-primary animate-scan" />
      </div>

      {/* 우측 상단 플로팅 툴 (카메라 컨트롤) */}
      <div className="absolute top-[24px] right-[24px] flex flex-col gap-[16px] z-30">
        <button className="w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.9)] flex items-center justify-center shadow-none text-[#1A1A1A]">
          <Zap size={20} className="fill-none" />
        </button>
        <button className="w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.9)] flex items-center justify-center shadow-none text-[#1A1A1A]">
          <ImageIcon size={20} />
        </button>
      </div>

    </div>
  );
}
