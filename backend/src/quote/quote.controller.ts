import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('quotes')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getQuotes() {
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    const quotes = await this.quoteService.getQuotes(user.id);
    return { success: true, data: quotes };
  }

  @Post()
  async addQuote(@Body('text') text: string) {
    if (!text || text.trim() === '') {
      throw new Error('Text is required');
    }
    
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    const quote = await this.quoteService.addQuote(user.id, text.trim());
    return { success: true, data: quote };
  }

  @Delete(':id')
  async deleteQuote(@Param('id') id: string) {
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    await this.quoteService.deleteQuote(user.id, id);
    return { success: true };
  }
}
