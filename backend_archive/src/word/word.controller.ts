import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { WordService } from './word.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('words')
export class WordController {
  constructor(
    private readonly wordService: WordService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('review')
  async getReviewWords(@Query('subject') subject: 'English' | 'Chinese' | 'Japanese') {
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    const words = await this.wordService.getReviewWords(user.id, subject);
    
    const mapped = words.map(w => ({
      wordId: w.id,
      diaryId: w.diaryId,
      word: w.word,
      meaning: w.meaning,
      exampleSentence: w.exampleSentence,
      status: w.userStatuses[0]?.status || 'UNKNOWN'
    }));

    return { success: true, data: mapped };
  }

  @Post('status')
  async updateWordStatus(
    @Body('wordId') wordId: string,
    @Body('status') status: 'KNOW' | 'AGAIN' | 'DONT_KNOW',
  ) {
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    await this.wordService.updateWordStatus(user.id, wordId, status);
    return { success: true, message: 'Word status updated successfully.' };
  }
}
