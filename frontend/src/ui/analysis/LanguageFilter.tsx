import React from 'react';
import clsx from 'clsx';

export type LanguageTab = 'ALL' | 'ENGLISH' | 'CHINESE' | 'JAPANESE';

interface LanguageFilterProps {
  selectedTab: LanguageTab;
  onTabSelect: (tab: LanguageTab) => void;
}

const tabs: LanguageTab[] = ['ALL', 'ENGLISH', 'CHINESE', 'JAPANESE'];

export default function LanguageFilter({ selectedTab, onTabSelect }: LanguageFilterProps) {
  return (
    <div className="flex w-full gap-[8px] overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isActive = selectedTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabSelect(tab)}
            className={clsx(
              "px-[12px] py-[4px] rounded-[50px] whitespace-nowrap text-[11px] font-semibold transition-all duration-200 shadow-none",
              isActive 
                ? "bg-primary text-white border-transparent"
                : "bg-white text-[#1A1A1A] border-[1px] border-[#E5E5E5]"
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
