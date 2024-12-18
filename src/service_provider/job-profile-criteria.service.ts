import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriteriasJobProfile } from 'src/modules/entities/job-criteria-map.entity';
import { Criteria } from 'src/modules/entities/criterias.entity';

@Injectable()
export class JobProfileService {
  constructor(
    @InjectRepository(CriteriasJobProfile)
    private readonly criteriasJobProfileRepository: Repository<CriteriasJobProfile>,
  ) {}

  
    async getCriteriaForJobDescription(jobDescriptionId: string): Promise<Criteria[]> {
      const criteriaMappings = await this.criteriasJobProfileRepository.find({
        where: { job_profile_id: jobDescriptionId }, // Correct way to filter by related entity ID
        relations: ['criteria_id'],
      });

    return criteriaMappings.map((mapping) => mapping.criteria_id);
  }
}