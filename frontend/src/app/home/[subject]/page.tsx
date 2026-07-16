import React from 'react';
import DetailHeader from '../../../ui/components/DetailHeader';
import BottomNav from '../../../ui/components/BottomNav';
import DetailViewClient from '../../../ui/home-click/DetailViewClient';
import { getDiaries } from '../../../api/client';

interface DetailPageProps {
  params: Promise<{
    subject: string;
  }>;
  searchParams: Promise<{
    date?: string;
  }>;
}

export default async function DetailPage({ params, searchParams }: DetailPageProps) {
  // Next.js 15부터 params, searchParams는 비동기(Promise)이므로 await로 풀어주어야 합니다.
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const subjectParam = resolvedParams.subject || '';
  const initialDate = resolvedSearchParams.date || '';

  // 동적 라우팅 파라미터에서 첫 글자를 대문자로 변환 (e.g. english -> English)
  const formattedSubject = subjectParam.charAt(0).toUpperCase() + subjectParam.slice(1);
  
  // 백엔드 API에서 데이터 불러오기
  let subjectDiaries: any[] = [];
  try {
    const res = await getDiaries();
    if (res.success) {
      subjectDiaries = res.data
        .filter((d: any) => d.subject === formattedSubject)
        .map((d: any) => {
          const dObj = new Date(d.date);
          const mm = String(dObj.getMonth() + 1).padStart(2, '0');
          const dd = String(dObj.getDate()).padStart(2, '0');
          return {
            ...d,
            date: `${mm}.${dd}`,
            fullText: d.content || d.fullText, // API 응답 필드와 매핑
          };
        });
    }
  } catch (err) {
    console.error('Failed to fetch diaries in DetailPage:', err);
  }

  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      <DetailHeader />
      <main className="flex-1 overflow-hidden relative">
        <DetailViewClient 
          subject={formattedSubject} 
          diaries={subjectDiaries} 
          initialDate={initialDate}
        />
      </main>
      <BottomNav />
    </div>
  );
}
