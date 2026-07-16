import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const totalAttempts = await this.prisma.quizAttempt.count({ where: { userId } });
    const correctAttempts = await this.prisma.quizAttempt.count({ where: { userId, isCorrect: true } });
    
    const quizAccuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
    const wordsLearned = await this.prisma.userWordStatus.count({ where: { userId } });

    return {
      totalStudyMinutes: user.totalStudyMinutes,
      consecutiveDays: user.consecutiveDays,
      quizAccuracy: Math.round(quizAccuracy),
      wordsLearned,
    };
  }
}
