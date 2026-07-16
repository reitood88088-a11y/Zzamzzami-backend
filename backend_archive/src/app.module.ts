import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DiaryModule } from './diary/diary.module';
import { WordModule } from './word/word.module';
import { QuizModule } from './quiz/quiz.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [
    PrismaModule,
    DiaryModule,
    WordModule,
    QuizModule,
    DashboardModule,
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
