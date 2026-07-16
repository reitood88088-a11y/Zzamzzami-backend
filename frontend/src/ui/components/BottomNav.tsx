"use client";

import React from 'react';
import { Camera, Layers, Home, Zap, BarChart2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // 탭 순서: 스캔, 복습, 홈, AI퀴즈, 분석
  const tabs = [
    { name: '스캔', path: '/scan', icon: Camera },
    { name: '복습', path: '/review', icon: Layers },
    { name: '홈', path: '/home', icon: Home },
    { name: 'AI퀴즈', path: '/ai-quiz', icon: Zap },
    { name: '분석', path: '/analysis', icon: BarChart2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full sm:absolute sm:bottom-0 sm:left-0 h-[80px] bg-white border-t border-[#E5E5E5] flex justify-around items-center px-0 pb-[12px] pt-2 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.path || (pathname === '/' && tab.path === '/home');

        return (
          <button
            key={tab.name}
            onClick={() => router.push(tab.path)}
            className="flex flex-col items-center justify-center min-w-[50px] gap-[4px]"
          >
            <Icon
              size={22}
              className={clsx(
                "transition-colors duration-200",
                isActive ? "text-primary fill-primary" : "text-[#666666]" // Primary: #83539D
              )}
            />
            <span
              className={clsx(
                "text-[11px] leading-normal",
                isActive ? "text-primary font-bold" : "text-[#666666] font-medium"
              )}
            >
              {tab.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

