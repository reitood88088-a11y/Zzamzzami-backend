import React from 'react';
export const dynamic = 'force-dynamic';
import GlobalHeader from '../../ui/components/GlobalHeader';
import BottomNav from '../../ui/components/BottomNav';
import Bookshelf from '../../ui/home/Bookshelf';
import { getDiaries } from '../../api/client';

export default async function HomePage() {
  // 언어별로 데이터 분류
  const subjects = ['English', 'Chinese', 'Japanese'];
  
  let diaries = [];
  try {
    const res = await getDiaries();
    if (res.success) {
      diaries = res.data.map((d: any) => {
        const dObj = new Date(d.date);
        const mm = String(dObj.getMonth() + 1).padStart(2, '0');
        const dd = String(dObj.getDate()).padStart(2, '0');
        
        // 24시간 이내인지 확인하여 isNew 동적 계산
        const createdAt = d.createdAt ? new Date(d.createdAt) : dObj;
        const now = new Date();
        const diffMs = now.getTime() - createdAt.getTime();
        const isNew = diffMs < 24 * 60 * 60 * 1000;
        
        return {
          ...d,
          date: `${mm}.${dd}`,
          isNew, // 24시간 지났으면 false로 덮어쓰기
        };
      });
    }
  } catch (err) {
    console.error('Failed to fetch diaries:', err);
  }

  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      {/* 상단 고정 헤더 */}
      <GlobalHeader />

      {/* 메인 스크롤 영역 (헤더 115px, 하단 네비 80px 제외) */}
      <main className="flex-1 overflow-y-auto mt-[115px] mb-[80px] no-scrollbar">
        {subjects.map((subject, index) => {
          const subjectDiaries = diaries.filter((d: any) => d.subject === subject);
          // 짝수 인덱스(0부터 시작하므로 1번 인덱스인 Chinese가 isEven)
          const isEven = index % 2 !== 0; 
          
          return (
            <Bookshelf 
              key={subject} 
              subject={subject} 
              diaries={subjectDiaries} 
              isEven={isEven} 
            />
          );
        })}
      </main>

      {/* 하단 고정 네비게이션 */}
      <BottomNav />
    </div>
  );
}
