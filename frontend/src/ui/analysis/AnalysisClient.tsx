"use client";

import React, { useState, useEffect } from 'react';
import LanguageFilter, { LanguageTab } from './LanguageFilter';
import CoreStatsGrid, { StatsData } from './CoreStatsGrid';
import WeeklyChartCard from './WeeklyChartCard';
import TimeInsightBubble from './TimeInsightBubble';
import QuoteWidget from './QuoteWidget';
import { getDashboard } from '../../api/client';

export default function AnalysisClient() {
  const [selectedTab, setSelectedTab] = useState<LanguageTab>('ALL');
  const [isAnimating, setIsAnimating] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getDashboard();
        setDashboardData(res.data);
      } catch (err) {
        console.error('Failed to load dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleTabSelect = (tab: LanguageTab) => {
    if (tab === selectedTab) return;
    
    setIsAnimating(true);
    setSelectedTab(tab);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  if (loading || !dashboardData) {
    return <div className="w-full h-full flex items-center justify-center bg-[#F7F4EE] text-[#999]">통계를 불러오는 중...</div>;
  }

  // Use real data from API for stats
  const stats: StatsData = {
    wordsLearned: dashboardData.wordsLearned || 0,
    quizAccuracy: dashboardData.quizAccuracy || 0,
    streakDays: dashboardData.consecutiveDays || 0,
  };

  // Keep mock charts and time insight since backend doesn't support them yet
  const chartData = [
    { day: 'mon.', value: 20 },
    { day: 'tue.', value: 45 },
    { day: 'wed.', value: 10 },
    { day: 'thu.', value: 60 },
    { day: 'fri.', value: 35 },
    { day: 'sat.', value: 0 },
    { day: 'sun.', value: 50 },
  ];
  const hoursSaved = 5.5;

  return (
    <div className="w-full h-full flex flex-col px-[20px] pt-[20px] pb-[40px] bg-[#F7F4EE] overflow-y-auto no-scrollbar gap-[16px]">
      
      {/* 1. 언어 필터 탭 */}
      <LanguageFilter selectedTab={selectedTab} onTabSelect={handleTabSelect} />

      {/* 컨텐츠 영역 (탭 전환 시 부드러운 페이드 인/아웃 효과) */}
      <div className={`flex flex-col gap-[16px] transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
        
        {/* 2. 핵심 통계 그리드 (단어수, 정답률, 연속학습) */}
        <CoreStatsGrid stats={stats} />

        {/* 3. 주간 학습량 바 차트 */}
        <WeeklyChartCard data={chartData} />

        {/* 4. 시간 절약 인사이트 버블 */}
        <TimeInsightBubble hoursSaved={hoursSaved} />
        
        {/* 5. 동기부여 명언 위젯 (새로 추가) */}
        <div className="mt-[4px]">
          <QuoteWidget />
        </div>
        
      </div>
    </div>
  );
}
