import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminUser } from './modules/entities/admin-user.entity';
import { JobProfile } from './modules/entities/job-profile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables available globally
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [AdminUser, JobProfile], // Add all entities here
      synchronize: true, // Ensures tables are created automatically (development only)
      logging: true, // Logs SQL queries for debugging
    }),
  ],
})
export class AppModule {}
