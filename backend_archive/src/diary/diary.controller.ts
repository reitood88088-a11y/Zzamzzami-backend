import { Controller, Get, Post, Query, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DiaryService } from './diary.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('scan')
export class ScanController {
  constructor(
    private readonly diaryService: DiaryService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async scan(
    @UploadedFile() file: Express.Multer.File,
    @Body('subject') subject: 'English' | 'Chinese' | 'Japanese',
  ) {
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    const diary = await this.diaryService.scanAndSave(user.id, subject, file);
    return { success: true, data: diary };
  }
}

@Controller('diaries')
export class DiaryController {
  constructor(
    private readonly diaryService: DiaryService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getDiaries(@Query('subject') subject?: 'English' | 'Chinese' | 'Japanese') {
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    const diaries = await this.diaryService.getDiaries(user.id, subject);
    return { success: true, data: diaries };
  }
}
