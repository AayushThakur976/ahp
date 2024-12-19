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
    // First, fetch the job profile to ensure it exists
    const jobProfile = await this.jobProfileRepository.findOne({
      where: { id: jobProfileId },
    });

    if (!jobProfile) {
      throw new Error(`Job Profile with ID ${jobProfileId} not found`);
    }

    // Fetch the job profile-criteria mapping
    const criteriasJobProfiles = await this.criteriasJobProfileRepository.find({
      where: { jobProfile: { id: jobProfileId } },
      relations: ['criteria'],  // Make sure to load the criteria entity as well
    });

    // Return the criteria array
    return criteriasJobProfiles.map((item) => item.criteria);
  }
}
