import { Controller, Get, Post, Body } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getDashboard() {
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    const data = await this.dashboardService.getDashboard(user.id);
    return { success: true, data };
  }

  @Post('time')
  async reportStudyTime(@Body() body: { subject: 'English' | 'Chinese' | 'Japanese', seconds: number }) {
    const user = await this.prisma.getDefaultUser();
    if (!user) throw new Error('User not found');

    if (!body.subject || !body.seconds || body.seconds <= 0) {
      return { success: false, message: 'Invalid data' };
    }

    await this.dashboardService.reportStudyTime(user.id, body.subject, body.seconds);
    return { success: true };
  }
}
