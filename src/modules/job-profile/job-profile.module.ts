import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobProfileController } from './job-profile.controller';
import { CriteriaService } from './job-profile.service';
import { CriteriasJobProfile } from '../entities/job-criteria-map.entity';
import { JobProfile } from '../entities/job-profile.entity';
import { Criteria } from '../entities/criterias.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CriteriasJobProfile, JobProfile, Criteria]), // Ensure correct feature imports
  ],
  controllers: [JobProfileController],
  providers: [CriteriaService],
})
export class JobProfileModule {}
