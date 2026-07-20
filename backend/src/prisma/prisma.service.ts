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

    // Auto-migrate tables if they don't exist (helpful when prisma db push hasn't been run)
    /*
    try {
      await this.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS user_quote (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            text TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      await this.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS daily_study_time (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            subject subject_type NOT NULL,
            date DATE NOT NULL,
            duration_seconds INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (user_id, subject, date)
        );
      `);
    } catch (err) {
      console.log('Skipping auto-migration, tables might already exist or DB restricted:', err.message);
    }
    */

    // Ensure default user exists (for personal use)
    /*
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
    */
  }

  async getDefaultUser() {
    return this.user.findUnique({ where: { email: 'personal@zzamzzami.app' } });
  }
}
