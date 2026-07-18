"use client";

import React, { useState, useEffect } from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import StoryProgressBar from './StoryProgressBar';
import clsx from 'clsx';
import { getQuizzes, submitQuizAttempt } from '../../api/client';
import { useStudyTimeTracker } from '../../hooks/useStudyTimeTracker';

export default function QuizClient() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowingInsight, setIsShowingInsight] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Hardcode language for now, just like getQuizzes('English')
  useStudyTimeTracker('English');

  useEffect(() => {
    async function loadQuizzes() {
      try {
        const res = await getQuizzes('English'); // Hardcode subject for now
        const mapped = res.data.map((q: any) => ({
          id: q.quizId,
          question: q.question,
          options: q.options,
          correctAnswer: q.options[q.correctOptionIndex],
          insight: q.explanation
        }));
        setQuizzes(mapped);
      } catch (err) {
        console.error('Failed to load quizzes', err);
      } finally {
        setLoading(false);
      }
    }
    loadQuizzes();
  }, []);

  const currentQuiz = quizzes[currentIndex];

  const handleOptionClick = async (option: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    
    // Save attempt to backend
    try {
      const isCorrect = option === currentQuiz.correctAnswer;
      await submitQuizAttempt(currentQuiz.id, isCorrect);
    } catch (err) {
      console.error('Failed to submit attempt', err);
    }
    
    setTimeout(() => {
      setIsShowingInsight(true);
    }, 400);
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setSelectedOption(null);
      setIsShowingInsight(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("모든 퀴즈를 완료했습니다!");
      // 홈이나 다른 탭으로 리다이렉트 가능
    }
  };

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center bg-[#F7F4EE] text-[#999]">퀴즈를 불러오는 중...</div>;
  }

  if (quizzes.length === 0) {
    return <div className="w-full h-full flex items-center justify-center bg-[#F7F4EE] text-[#999]">오늘의 퀴즈가 없습니다!</div>;
  }

  return (
    <div className="w-full h-full flex flex-col px-[24px] pt-[24px] pb-[40px] bg-[#F7F4EE]">
      <StoryProgressBar 
        totalSegments={quizzes.length} 
        currentIndex={currentIndex} 
        isShowingInsight={isShowingInsight} 
      />

      {!isShowingInsight ? (
        <div className="flex-1 flex flex-col mt-[40px] animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-[#1A1A1A] text-[26px] font-bold leading-[1.35] tracking-[-0.3px] mb-8">
            {currentQuiz.question}
          </h2>
          
          <div className="flex flex-col gap-[12px] mt-auto mb-auto">
            {currentQuiz.options.map((opt: string, idx: number) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQuiz.correctAnswer;
              
              let buttonStyleClass = "bg-white border-[1.5px] border-[#E5E5E5] text-[#1A1A1A]";
              if (isSelected) {
                if (isCorrect) {
                  buttonStyleClass = "bg-white border-[2px] border-[#22C55E] text-[#22C55E] font-bold";
                } else {
                  buttonStyleClass = "bg-white border-[2px] border-[#EF4444] text-[#EF4444] font-bold";
                }
              }

              return (
                <button
                  key={`opt-${idx}`}
                  onClick={() => handleOptionClick(opt)}
                  className={clsx(
                    "w-full px-[24px] py-[18px] rounded-[50px] text-left text-[18px] leading-[1.45] tracking-[-0.2px] transition-all duration-200 shadow-none",
                    buttonStyleClass
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col mt-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex-1 bg-[#E5DEFA] rounded-[24px] p-[32px] flex flex-col justify-center">
            <div className="flex items-center gap-[8px] mb-[24px]">
              <Lightbulb size={24} className="text-primary fill-primary/20" />
              <h3 className="text-primary text-[20px] font-bold">인사이트</h3>
            </div>
            
            <p className="text-[#1A1A1A] text-[22px] font-bold leading-[1.4] mb-[16px]">
              정답: {currentQuiz.correctAnswer}
            </p>
            
            <p className="text-[#1A1A1A] text-[18px] font-normal leading-[1.6]">
              {currentQuiz.insight}
            </p>
            
            <div className="mt-8 pt-6 border-t border-primary/20">
              <p className="text-[#666666] text-[16px]">
                당신의 선택: <span className={selectedOption === currentQuiz.correctAnswer ? "text-[#529D6E] font-bold" : "text-[#9D5252] font-bold"}>{selectedOption}</span>
              </p>
            </div>
          </div>

          <button 
            onClick={handleNext}
            className="w-full mt-[24px] py-[18px] bg-primary rounded-[50px] text-white text-[18px] font-bold flex items-center justify-center gap-2 shadow-none active:scale-95 transition-transform"
          >
            {currentIndex === quizzes.length - 1 ? '완료' : '다음 문제'} <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
