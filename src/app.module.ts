import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './modules/entities/admin-user.entity';
import { JobProfile } from './modules/entities/job-profile.entity';
import { Criteria } from './modules/entities/criterias.entity';
import { Candidate } from './modules/entities/candidate.entity';
import { Interviewer } from './modules/entities/interviewer.entity';
import { CriteriaInterviewerResult } from './modules/entities/criteria_interviewResult_map';
import { CriteriasJobProfile } from './modules/entities/job-criteria-map.entity';
import { JobProfileModule } from './modules/job-profile/job-profile.module';
import { CriteriaModule } from './modules/criteria_score/criteria.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Ensures that configuration is accessible globally
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,  // Ensure DB_HOST is set in .env file
      port: parseInt(process.env.DB_PORT, 10),  // Ensure DB_PORT is set in .env file
      username: process.env.DB_USERNAME,  // Ensure DB_USERNAME is set in .env file
      password: process.env.DB_PASSWORD,  // Ensure DB_PASSWORD is set in .env file
      database: process.env.DB_NAME,  // Ensure DB_NAME is set in .env file
      entities: [
        AdminUser,
        JobProfile,
        Criteria,
        Candidate,
        Interviewer,
        CriteriaInterviewerResult,
        CriteriasJobProfile,
      ],
      synchronize: true,  // Be cautious with this in production (it automatically syncs the schema with the database)
    }),
    JobProfileModule,  // Import the JobModule 
    CriteriaModule,

  ],
})
export class AppModule {}
