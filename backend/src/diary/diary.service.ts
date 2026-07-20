import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DiaryService {
  constructor(private readonly prisma: PrismaService) {}

  async scanAndSave(userId: string, subject: 'English' | 'Chinese' | 'Japanese', file: Express.Multer.File) {
    // Mock OCR and DB Save
    // TODO: Connect real OCR and AI extraction later
    const mockFullText = `This is a mock scanned text for ${subject}. It is extracted from the uploaded image ${file.originalname}. The quick brown fox jumps over the lazy dog.`;
    const mockSnippet = mockFullText.substring(0, 30) + '...';

    const diary = await this.prisma.diary.create({
      data: {
        userId,
        subject,
        date: new Date(),
        contentSnippet: mockSnippet,
        fullText: mockFullText,
        isNew: true,
      },
    });

    // Mock Word Extraction
    await this.prisma.word.createMany({
      data: [
        { diaryId: diary.id, word: 'mock', meaning: '모의의, 가짜의', exampleSentence: 'This is a mock scanned text.' },
        { diaryId: diary.id, word: 'extract', meaning: '추출하다', exampleSentence: 'It is extracted from the uploaded image.' },
      ],
    });

    // Mock Quiz Generation
    await this.prisma.quiz.create({
      data: {
        diaryId: diary.id,
        question: 'What is the meaning of the word "mock" in the context of the text?',
        options: JSON.stringify(['모의의, 가짜의', '진짜의', '빠른', '느린']),
        correctOptionIndex: 0,
        explanation: '문맥상 진짜가 아닌 가짜/모의 데이터를 의미하므로 "모의의, 가짜의"가 정답입니다.',
      },
    });

    return diary;
  }

  async getDiaries(userId: string, subject?: 'English' | 'Chinese' | 'Japanese') {
    return this.prisma.diary.findMany({
      where: {
        userId,
        ...(subject && { subject }),
      },
      orderBy: { date: 'desc' },
    });
  }

  async deleteDiary(userId: string, diaryId: string) {
    const diary = await this.prisma.diary.findUnique({ where: { id: diaryId } });
    if (!diary || diary.userId !== userId) {
      throw new Error('Diary not found or unauthorized');
    }

    // Delete related records manually to prevent foreign key constraint violations
    // if the physical database was created without ON DELETE CASCADE
    
    // 1. Delete UserWordStatus associated with the words of this diary
    const words = await this.prisma.word.findMany({ where: { diaryId } });
    const wordIds = words.map(w => w.id);
    if (wordIds.length > 0) {
      await this.prisma.userWordStatus.deleteMany({
        where: { wordId: { in: wordIds } }
      });
    }

    // 2. Delete QuizAttempts associated with the quizzes of this diary
    const quizzes = await this.prisma.quiz.findMany({ where: { diaryId } });
    const quizIds = quizzes.map(q => q.id);
    if (quizIds.length > 0) {
      await this.prisma.quizAttempt.deleteMany({
        where: { quizId: { in: quizIds } }
      });
    }

    // 3. Delete Words and Quizzes
    await this.prisma.word.deleteMany({ where: { diaryId } });
    await this.prisma.quiz.deleteMany({ where: { diaryId } });

    // 4. Finally delete the Diary
    return this.prisma.diary.delete({ where: { id: diaryId } });
  }
}
