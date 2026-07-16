"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { uploadScan } from '../../api/client';
import { Image as ImageIcon } from 'lucide-react';

export default function ScanActionSheet() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    try {
      await uploadScan(file, 'English');
      router.push('/home');
    } catch (err) {
      console.error('Scan failed:', err);
      alert('스캔 중 오류가 발생했습니다. (자세한 내용은 Vercel 로그 확인)');
    } finally {
      setIsScanning(false);
      if (cameraInputRef.current) cameraInputRef.current.value = '';
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  return (
    <div className="relative z-40 bg-[#F7F4EE] rounded-t-[24px] -mt-[32px] pt-[48px] px-[24px] pb-[100px] flex flex-col items-center">
      
      {/* 갤러리 버튼 (우상단) */}
      <button 
        onClick={handleGalleryClick}
        className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-800 transition-colors"
        aria-label="갤러리에서 사진 선택"
      >
        <ImageIcon size={28} />
      </button>

      {/* 제목 및 안내 본문 */}
      <div className="w-full text-center mb-8">
        <h2 className="text-[#1A1A1A] text-[26px] font-bold leading-[1.35] tracking-[-0.3px] mb-2">
          문서를 스캔하세요
        </h2>
        <p className="text-[#1A1A1A] text-[18px] font-light leading-[1.45] tracking-[-0.2px]">
          화면 중앙 박스에 텍스트를 맞춰주세요.
        </p>
      </div>

      {/* Hidden file inputs */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment"
        className="hidden" 
        ref={cameraInputRef} 
        onChange={handleFileChange} 
      />
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={galleryInputRef} 
        onChange={handleFileChange} 
      />

      {/* 스캔 CTA 버튼 (Thumb-Zone Optimization) */}
      <button 
        onClick={handleCameraClick}
        disabled={isScanning}
        className="w-full h-[50px] bg-primary rounded-full flex items-center justify-center text-white text-[20px] font-medium leading-[1.4] tracking-[-0.1px] shadow-none disabled:opacity-50"
      >
        {isScanning ? 'AI가 인식 중입니다...' : '스캔하기'}
      </button>

    </div>
  );
}
