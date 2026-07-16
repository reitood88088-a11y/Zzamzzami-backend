import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuoteService {
  constructor(private readonly prisma: PrismaService) {}

  async getQuotes(userId: string) {
    return this.prisma.userQuote.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async addQuote(userId: string, text: string) {
    return this.prisma.userQuote.create({
      data: {
        userId,
        text,
      },
    });
  }

  async deleteQuote(userId: string, quoteId: string) {
    // 본인의 명언인지 확인 (보안)
    const quote = await this.prisma.userQuote.findUnique({
      where: { id: quoteId },
    });
    if (!quote || quote.userId !== userId) {
      throw new Error('Not authorized or quote not found');
    }

    return this.prisma.userQuote.delete({
      where: { id: quoteId },
    });
  }
}
