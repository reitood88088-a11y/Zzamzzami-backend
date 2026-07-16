"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { uploadScan } from '../../api/client';

export default function ScanActionSheet() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    try {
      await uploadScan(file, 'English');
      // Redirect to home after successful scan
      router.push('/home');
    } catch (err) {
      console.error('Scan failed:', err);
      alert('스캔 중 오류가 발생했습니다. (자세한 내용은 Vercel 로그 확인)');
    } finally {
      setIsScanning(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleScanClick = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  return (
    <div className="relative z-40 bg-[#F7F4EE] rounded-t-[24px] -mt-[32px] pt-[48px] px-[24px] pb-[100px] flex flex-col items-center">

      {/* 제목 및 안내 본문 */}
      <div className="w-full text-center mb-8">
        <h2 className="text-[#1A1A1A] text-[26px] font-bold leading-[1.35] tracking-[-0.3px] mb-2">
          문서를 업로드하세요
        </h2>
        <p className="text-[#1A1A1A] text-[18px] font-light leading-[1.45] tracking-[-0.2px]">
          카메라로 촬영하거나 갤러리/PC에서 이미지를 선택해주세요.
        </p>
      </div>

      {/* Hidden file input */}
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />

      {/* 스캔 CTA 버튼 (Thumb-Zone Optimization) */}
      <button 
        onClick={handleScanClick}
        disabled={isScanning}
        className="w-full h-[50px] bg-primary rounded-full flex items-center justify-center text-white text-[20px] font-medium leading-[1.4] tracking-[-0.1px] shadow-none disabled:opacity-50"
      >
        {isScanning ? 'AI가 인식 중입니다...' : '사진 선택 / 촬영하기'}
      </button>

    </div>
  );
}
