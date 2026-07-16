import { Module } from '@nestjs/common';
import { DiaryController, ScanController } from './diary.controller';
import { DiaryService } from './diary.service';

@Module({
  controllers: [ScanController, DiaryController],
  providers: [DiaryService]
})
export class DiaryModule {}
