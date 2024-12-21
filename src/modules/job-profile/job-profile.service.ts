import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriteriasJobProfile } from '../entities/job-criteria-map.entity';
import { JobProfile } from '../entities/job-profile.entity';
import { Criteria } from '../entities/criterias.entity';

@Injectable()
export class CriteriaService {
  constructor(
    @InjectRepository(CriteriasJobProfile)
    private readonly criteriasJobProfileRepository: Repository<CriteriasJobProfile>,
    @InjectRepository(JobProfile)
    private readonly jobProfileRepository: Repository<JobProfile>,
  ) {}

  // Fetch criteria associated with a given job profile ID
  async getCriteriaForJobProfile(jobProfileId: string): Promise<Criteria[]> {
    const jobProfile = await this.jobProfileRepository.findOne({
      where: { id: jobProfileId },
    });

    if (!jobProfile) {
      throw new Error(`Job Profile with ID ${jobProfileId} not found`);
    }

    // Ensure the join is made properly with the criteria
    const criteriasJobProfiles = await this.criteriasJobProfileRepository.find({
      where: { jobProfile: { id: jobProfileId } },
      relations: ['criteria'],  // Ensures that the related 'criteria' are loaded
    });

    return criteriasJobProfiles.map((item) => item.criteria);
  }
}
