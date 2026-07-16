import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async getQuizzes(userId: string, subject: 'English' | 'Chinese' | 'Japanese') {
    return this.prisma.quiz.findMany({
      where: {
        diary: {
          userId,
          subject,
        },
      },
    });
  }

  async submitAttempt(userId: string, quizId: string, isCorrect: boolean) {
    return this.prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        isCorrect,
      },
    });
  }
}
