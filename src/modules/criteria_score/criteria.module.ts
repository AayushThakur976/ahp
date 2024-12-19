import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriteriaService } from './criteria.service';
import { Criteria } from '../entities/criterias.entity';
import { Candidate } from '../entities/candidate.entity';
import { CriteriaInterviewerResult } from '../entities/criteria_interviewResult_map';
import { JobProfile } from '../entities/job-profile.entity';
import { CriteriaController } from './criteria.controller'; // Import the controller

@Module({
  imports: [
    TypeOrmModule.forFeature([Criteria, Candidate, CriteriaInterviewerResult, JobProfile]),
  ],
  providers: [CriteriaService],
  controllers: [CriteriaController], // Include the controller
  exports: [CriteriaService], // Export the service if needed elsewhere
})
export class CriteriaModule {}
