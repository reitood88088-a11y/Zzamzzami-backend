import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WordService {
  constructor(private readonly prisma: PrismaService) {}

  async getReviewWords(userId: string, subject: 'English' | 'Chinese' | 'Japanese') {
    return this.prisma.word.findMany({
      where: {
        diary: {
          userId,
          subject,
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
