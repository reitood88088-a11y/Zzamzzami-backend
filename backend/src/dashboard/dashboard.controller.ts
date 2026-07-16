import { Controller, Get } from '@nestjs/common';
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
}
