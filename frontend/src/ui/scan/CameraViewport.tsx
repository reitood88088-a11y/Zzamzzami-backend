"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { uploadScan } from '../../api/client';
import { compressImage } from '../../utils/image';

export default function CameraViewport() {
  const router = useRouter();
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleGalleryClick = () => {
    if (isScanning) return;
    galleryInputRef.current?.click();
  };


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsScanning(true);
      // Compress the image before uploading to prevent Vercel 413 Payload Too Large
      const compressedFile = await compressImage(file);
      await uploadScan(compressedFile, 'English');
      
      // 스캔 완료 후 Toast 띄우고 1.5초 뒤 홈으로 이동
      setShowToast(true);
      setTimeout(() => {
        router.push('/home');
      }, 1500);
      
    } catch (err) {
      console.error('Scan failed:', err);
      alert('스캔 중 오류가 발생했습니다. (자세한 내용은 Vercel 로그 확인)');
    } finally {
      setIsScanning(false);
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  return (
    <div className="relative flex-1 bg-[#333333] w-full flex items-center justify-center overflow-hidden">
      
      {/* 컷아웃(Cut-out) 오버레이 효과 - 테두리 부분만 어둡게 처리 */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          borderWidth: '20vh 12.5vw',
          borderColor: 'rgba(0,0,0,0.3)',
          borderStyle: 'solid'
        }}
      />

      {/* 포커스 프레임 (가운데 타겟 영역) */}
      <div className="absolute w-[75%] h-[60%] border-[2px] border-[rgba(255,255,255,0.8)] rounded-[8px] z-20 pointer-events-none overflow-hidden">
        <div className="absolute left-0 w-full h-[2px] bg-primary animate-scan" />
      </div>

      {/* 숨겨진 파일 입력 (갤러리용) */}
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={galleryInputRef} 
        onChange={handleFileChange} 
      />

      {/* 우측 상단 플로팅 툴 (카메라 컨트롤) */}
      <div className="absolute top-[24px] right-[24px] flex flex-col gap-[16px] z-30">
        <button 
          disabled={isScanning}
          className="w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.9)] flex items-center justify-center shadow-none text-[#1A1A1A] disabled:opacity-50"
        >
          <Zap size={20} className="fill-none" />
        </button>
        <button 
          onClick={handleGalleryClick}
          disabled={isScanning}
          className="w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.9)] flex items-center justify-center shadow-none text-[#1A1A1A] cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ImageIcon size={20} />
        </button>
      </div>

      {/* 스캔 중 오버레이 */}
      {isScanning && !showToast && (
        <div className="absolute inset-0 bg-black/60 z-40 flex flex-col items-center justify-center">
          <Loader2 size={40} className="text-white animate-spin mb-4" />
          <p className="text-white text-[16px] font-bold">AI가 텍스트를 추출 중입니다...</p>
        </div>
      )}

      {/* 스캔 완료 Toast 메시지 */}
      {showToast && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white/95 px-6 py-4 rounded-[16px] shadow-lg flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 size={36} className="text-[#83539D]" />
          <p className="text-[#1A1A1A] text-[16px] font-bold">스캔이 완료되었습니다!</p>
        </div>
      )}

    </div>
  );
}
