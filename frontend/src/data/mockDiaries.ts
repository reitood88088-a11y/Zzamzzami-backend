export type Subject = 'English' | 'Chinese' | 'Japanese';

export interface Diary {
  id: string;
  subject: Subject;
  date: string; // e.g. "07.12"
  contentSnippet: string;
  fullText: string;
  isNew: boolean;
}

export const mockDiaries: Diary[] = [
  // 영어 기록 (07.12 2개)
  { 
    id: 'e1', subject: 'English', date: '07.12', 
    contentSnippet: 'The quick brown fox jumps...', 
    fullText: 'The quick brown fox jumps over the lazy dog. This is a classic pangram containing every letter of the English alphabet.',
    isNew: true 
  },
  { 
    id: 'e1-2', subject: 'English', date: '07.12', 
    contentSnippet: 'Consistency is key in language...', 
    fullText: 'Consistency is key in language learning. 10 minutes every day is much better than 1 hour once a week. Keep pushing your limits! \n\nWe need multiple cards for the same date to see how the Instagram story UI groups them perfectly. This is the second card for July 12th.',
    isNew: true 
  },
  { id: 'e2', subject: 'English', date: '07.10', contentSnippet: 'I look forward to hearing...', fullText: 'I look forward to hearing from you soon regarding the upcoming project deadline.', isNew: false },
  { id: 'e3', subject: 'English', date: '07.08', contentSnippet: 'Could you please let me know...', fullText: 'Could you please let me know if there are any updates on the design specifications?', isNew: false },
  // 중국어 기록 (07.11 2개)
  { id: 'c1', subject: 'Chinese', date: '07.11', contentSnippet: '你好，很高兴认识你...', fullText: '你好，很高兴认识你。我是来自韩国的开发者。最近我在学习开发移动端网页应用。', isNew: true },
  { id: 'c1-2', subject: 'Chinese', date: '07.11', contentSnippet: '这真是太棒了...', fullText: '这真是太棒了！我们可以一起努力完成这个项目。', isNew: true },
  { id: 'c2', subject: 'Chinese', date: '07.05', contentSnippet: '今天天气怎么样？...', fullText: '今天天气怎么样？听说下午可能会下雨，出门记得带伞哦。', isNew: false },
  // 일본어 기록
  { id: 'j1', subject: 'Japanese', date: '07.12', contentSnippet: 'はじめまして。よろしく...', fullText: 'はじめまして。よろしくお願いいたします。私はReactとNext.jsを使ってウェブアプリを作っています。', isNew: true },
  { id: 'j2', subject: 'Japanese', date: '07.09', contentSnippet: 'ありがとうございます...', fullText: 'いつもありがとうございます。大変助かっています。これからもよろしくお願いします。', isNew: false },
];
