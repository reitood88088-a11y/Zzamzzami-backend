import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('quizzes')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getQuizzes(@Query('subject') subject: 'English' | 'Chinese' | 'Japanese') {
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    const quizzes = await this.quizService.getQuizzes(user.id, subject);

    const mapped = quizzes.map(q => ({
      quizId: q.id,
      diaryId: q.diaryId,
      question: q.question,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correctOptionIndex: q.correctOptionIndex,
      explanation: q.explanation,
    }));

    return { success: true, data: mapped };
  }
  @Post('attempt')
  async submitAttempt(
    @Body('quizId') quizId: string,
    @Body('isCorrect') isCorrect: boolean,
  ) {
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    await this.quizService.submitAttempt(user.id, quizId, isCorrect);
    return { success: true };
  }
}
