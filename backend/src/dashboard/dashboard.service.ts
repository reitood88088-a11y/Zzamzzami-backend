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
    const wordsLearned = await this.prisma.userWordStatus.count({ 
      where: { 
        userId,
        status: 'KNOW',
      } 
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 6);
    lastWeek.setHours(0, 0, 0, 0);

    const studyTimes = await this.prisma.dailyStudyTime.findMany({
      where: {
        userId,
        date: { gte: lastWeek },
      },
    });

    // Initialize chart data
    const days = ['sun.', 'mon.', 'tue.', 'wed.', 'thu.', 'fri.', 'sat.'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weeklyChart: Record<string, any[]> = {
      ALL: [],
      English: [],
      Chinese: [],
      Japanese: [],
    };

    // Prepare 7 days structure
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dayName = days[d.getDay()];
      
      weeklyChart.ALL.push({ day: dayName, value: 0, date: d.getTime() });
      weeklyChart.English.push({ day: dayName, value: 0, date: d.getTime() });
      weeklyChart.Chinese.push({ day: dayName, value: 0, date: d.getTime() });
      weeklyChart.Japanese.push({ day: dayName, value: 0, date: d.getTime() });
    }

    // Populate data
    studyTimes.forEach((st) => {
      const stDate = new Date(st.date).getTime();
      const subject = st.subject;
      const minutes = Math.round(st.durationSeconds / 60);

      // Find index
      const idx = weeklyChart.ALL.findIndex(item => item.date === stDate);
      if (idx !== -1) {
        weeklyChart.ALL[idx].value += minutes;
        weeklyChart[subject][idx].value += minutes;
      }
    });

    const hoursSaved = (user.totalStudyMinutes / 60) * 3; // Example: 1 hour studied = 3 hours saved

    return {
      totalStudyMinutes: user.totalStudyMinutes,
      consecutiveDays: user.consecutiveDays,
      quizAccuracy: Math.round(quizAccuracy),
      wordsLearned,
      weeklyChart,
      hoursSaved: Number(hoursSaved.toFixed(1)),
    };
  }

  async reportStudyTime(userId: string, subject: 'English' | 'Chinese' | 'Japanese', seconds: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await this.prisma.dailyStudyTime.upsert({
      where: {
        userId_subject_date: {
          userId,
          subject,
          date: today,
        },
      },
      update: {
        durationSeconds: { increment: seconds },
      },
      create: {
        userId,
        subject,
        date: today,
        durationSeconds: seconds,
      },
    });

    const allStudy = await this.prisma.dailyStudyTime.aggregate({
      where: { userId },
      _sum: { durationSeconds: true },
    });
    
    const totalMinutes = Math.floor((allStudy._sum.durationSeconds || 0) / 60);
    await this.prisma.user.update({
      where: { id: userId },
      data: { totalStudyMinutes: totalMinutes },
    });
  }
}
