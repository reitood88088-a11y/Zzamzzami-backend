import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config(); // Loads backend/.env

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/zzamzzami?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ adapter });
  }
  async onModuleInit() {
    await this.$connect();

    // Ensure default user exists (for personal use)
    const defaultUserEmail = 'personal@zzamzzami.app';
    const user = await this.user.findUnique({ where: { email: defaultUserEmail } });
    if (!user) {
      await this.user.create({
        data: {
          email: defaultUserEmail,
          name: 'Personal User',
        },
      });
    }
  }

  async getDefaultUser() {
    return this.user.findUnique({ where: { email: 'personal@zzamzzami.app' } });
  }
}
