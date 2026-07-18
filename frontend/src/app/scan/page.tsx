import React from 'react';
import GlobalHeader from '../../ui/components/GlobalHeader';
import BottomNav from '../../ui/components/BottomNav';
import CameraViewport from '../../ui/scan/CameraViewport';
import ScanActionSheet from '../../ui/scan/ScanActionSheet';

export default function ScanPage() {
  return (
    <div className="relative w-full h-full bg-[#333333] flex flex-col">
      {/* 1. 상단 글로벌 헤더 (고정) */}
      <GlobalHeader />

      {/* 2. 중앙 카메라 뷰포트 (헤더 높이만큼 마진, Flex-grow로 남은 공간 모두 차지) */}
      <div className="flex-1 flex flex-col mt-[60px] mb-[80px]">
        <CameraViewport />

        {/* 3. 하단 액션 시트 (카메라 화면을 살짝 덮어쓰도록 설계됨) */}
        <ScanActionSheet />
      </div>

      {/* 4. 하단 네비게이션 (고정) */}
      <BottomNav />
    </div>
  );
}
