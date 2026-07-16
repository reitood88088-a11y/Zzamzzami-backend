"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Quote } from 'lucide-react';
import { getQuotes, addQuote, deleteQuote } from '../../api/client';

interface QuoteItem {
  id: string;
  text: string;
  isUserAdded: boolean;
}

const DEFAULT_QUOTES: QuoteItem[] = [
  { id: 'dq1', text: '지금 자면 꿈을 꾸지만, 지금 깨면 꿈을 이룬다.', isUserAdded: false },
  { id: 'dq2', text: '가장 큰 위험은 아무런 위험도 감수하지 않는 것이다.', isUserAdded: false },
  { id: 'dq3', text: '노력은 배신하지 않는다. 결과가 증명할 때까지 버텨라.', isUserAdded: false },
  { id: 'dq4', text: '오늘 나의 짬짬이 시간이 내일의 기적이 될 것이다.', isUserAdded: false },
  { id: 'dq5', text: '천 리 길도 한 걸음부터. 오늘의 작은 학습이 내일의 실력이 된다.', isUserAdded: false },
];

export default function QuoteWidget() {
  const [quotes, setQuotes] = useState<QuoteItem[]>(DEFAULT_QUOTES);
  const [currentQuote, setCurrentQuote] = useState<QuoteItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newQuoteText, setNewQuoteText] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. 초기 마운트 시 API에서 커스텀 명언 불러오기 & 랜덤 선택
  useEffect(() => {
    async function fetchQuotes() {
      try {
        const res = await getQuotes();
        if (res.success && Array.isArray(res.data)) {
          const userQuotes = res.data.map((q: any) => ({
            id: q.id,
            text: q.text,
            isUserAdded: true,
          }));
          const allQuotes = [...DEFAULT_QUOTES, ...userQuotes];
          setQuotes(allQuotes);
          if (userQuotes.length > 0) {
            // 사용자가 추가한 명언이 있으면 우선적으로 보여줌 (가장 마지막에 추가한 것 기준)
            setCurrentQuote(userQuotes[userQuotes.length - 1]);
          } else {
            pickRandomQuote(DEFAULT_QUOTES);
          }
        } else {
          pickRandomQuote(DEFAULT_QUOTES);
        }
      } catch (err) {
        console.error('Failed to fetch quotes:', err);
        pickRandomQuote(DEFAULT_QUOTES);
      } finally {
        setLoading(false);
      }
    }
    fetchQuotes();
  }, []);

  // 2. 랜덤 명언 선택 로직
  const pickRandomQuote = (quoteList: QuoteItem[]) => {
    if (quoteList.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    setCurrentQuote(quoteList[randomIndex]);
  };

  // 4. 새 명언 추가 로직
  const handleAddQuote = async () => {
    if (!newQuoteText.trim()) return;
    
    try {
      const res = await addQuote(newQuoteText.trim());
      if (res.success) {
        const newItem: QuoteItem = {
          id: res.data.id,
          text: res.data.text,
          isUserAdded: true,
        };
        const updatedQuotes = [...quotes, newItem];
        setQuotes(updatedQuotes);
        
        // 추가 후 방금 추가한 명언을 보여줌
        setCurrentQuote(newItem);
        setNewQuoteText('');
        setIsAdding(false);
      }
    } catch (err) {
      console.error('Failed to add quote:', err);
      alert('명언 추가에 실패했습니다.');
    }
  };

  // 5. 명언 삭제 로직
  const handleDeleteQuote = async (id: string) => {
    try {
      await deleteQuote(id);
      const updatedQuotes = quotes.filter(q => q.id !== id);
      setQuotes(updatedQuotes);
      
      // 삭제한 명언이 현재 보여지는 명언이라면 다른 명언으로 교체
      if (currentQuote?.id === id) {
        const remainingUserQuotes = updatedQuotes.filter(q => q.isUserAdded);
        if (remainingUserQuotes.length > 0) {
          // 남은 사용자 명언 중 가장 마지막 것 표시
          setCurrentQuote(remainingUserQuotes[remainingUserQuotes.length - 1]);
        } else {
          pickRandomQuote(DEFAULT_QUOTES);
        }
      }
    } catch (err) {
      console.error('Failed to delete quote:', err);
      alert('명언 삭제에 실패했습니다.');
    }
  };

  if (loading || !currentQuote) {
    return <div className="w-full flex items-center justify-center min-h-[60px] text-[#999] text-[12px]">로딩 중...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-[8px]">
      {/* 명언 디스플레이 카드 */}
      <div className="relative w-full bg-white border border-[#E5E5E5] rounded-[16px] p-[16px] shadow-none flex flex-col items-center justify-center min-h-[60px]">
        <Quote size={18} className="text-[#E5DEFA] absolute top-[8px] left-[12px]" />
        
        <p className="text-[#1A1A1A] text-[13px] font-medium leading-[1.4] text-center px-[20px]">
          "{currentQuote.text}"
        </p>
        
        {/* 사용자가 쓴 명언일 경우 삭제 아이콘 표시 */}
        {currentQuote.isUserAdded && (
          <button 
            onClick={() => handleDeleteQuote(currentQuote.id)}
            className="absolute top-[8px] right-[8px] p-[4px] text-[#9D5252] hover:bg-[#F7F4EE] rounded-full transition-colors"
            title="명언 삭제"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* 인라인 입력창 (isAdding 상태에 따라 토글) */}
      {isAdding ? (
        <div className="flex w-full gap-[8px] animate-in fade-in slide-in-from-top-2">
          <input
            type="text"
            value={newQuoteText}
            onChange={(e) => setNewQuoteText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddQuote(); }}
            placeholder="나만의 동기부여 명언을 적어보세요!"
            className="flex-1 bg-white border border-[#E5E5E5] rounded-[50px] px-[16px] py-[8px] text-[12px] text-[#1A1A1A] outline-none focus:border-primary transition-colors"
            autoFocus
          />
          <button
            onClick={handleAddQuote}
            className="bg-primary text-white text-[12px] font-bold px-[14px] rounded-[50px] whitespace-nowrap active:scale-95 transition-transform"
          >
            추가
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-[4px] text-[#666666] text-[11px] font-medium hover:text-primary transition-colors"
          >
            <Plus size={12} /> 직접 작성하기
          </button>
        </div>
      )}
    </div>
  );
}
