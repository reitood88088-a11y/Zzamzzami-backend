"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Image as ImageIcon } from 'lucide-react';
import { uploadScan } from '../../api/client';

export default function CameraViewport() {
  const router = useRouter();
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimension to compress image
          const MAX_SIZE = 1500;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const newFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(newFile);
            } else {
              reject(new Error('Canvas to Blob failed'));
            }
          }, 'image/jpeg', 0.8); // 80% quality
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Compress the image before uploading to prevent Vercel 413 Payload Too Large
      const compressedFile = await compressImage(file);
      await uploadScan(compressedFile, 'English');
      router.push('/home');
    } catch (err) {
      console.error('Scan failed:', err);
      alert('스캔 중 오류가 발생했습니다. (자세한 내용은 Vercel 로그 확인)');
    } finally {
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
        <button className="w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.9)] flex items-center justify-center shadow-none text-[#1A1A1A]">
          <Zap size={20} className="fill-none" />
        </button>
        <button 
          onClick={handleGalleryClick}
          className="w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.9)] flex items-center justify-center shadow-none text-[#1A1A1A] cursor-pointer hover:bg-gray-200 transition-colors"
        >
          <ImageIcon size={20} />
        </button>
      </div>

    </div>
  );
}
