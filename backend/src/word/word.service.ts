import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WordService {
  constructor(private readonly prisma: PrismaService) {}

  async getReviewWords(userId: string, subject: 'English' | 'Chinese' | 'Japanese') {
    const now = new Date();
    
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    startOfYesterday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    endOfToday.setHours(23, 59, 59, 999);

    return this.prisma.word.findMany({
      where: {
        diary: {
          userId,
          subject,
        },
        createdAt: {
          gte: startOfYesterday,
          lte: endOfToday,
        },
        userStatuses: {
          none: {
            userId,
            status: 'KNOW',
          },
        },
      },
      include: {
        userStatuses: {
          where: { userId }
        }
      }
    });
  }

  async updateWordStatus(userId: string, wordId: string, status: 'KNOW' | 'AGAIN' | 'DONT_KNOW') {
    return this.prisma.userWordStatus.upsert({
      where: {
        userId_wordId: {
          userId,
          wordId,
        },
      },
      update: { status },
      create: {
        userId,
        wordId,
        status,
      },
    });
  }
}
