import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriteriaInterviewerResult } from 'src/modules/entities/criteria_interviewResult_map';
import { Candidate } from 'src/modules/entities/candidate.entity';
import { Criteria } from 'src/modules/entities/criterias.entity';

@Injectable()
export class CriteriaCandidateScoreService {
  constructor(
    @InjectRepository(CriteriaInterviewerResult)
    private readonly criteriaInterviewerResultRepository: Repository<CriteriaInterviewerResult>,
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    @InjectRepository(Criteria)
    private readonly criteriaRepository: Repository<Criteria>,
  ) {}

  async getCriteriaCandidateMap(jobProfileId: string): Promise<any[][]> {
    // 1. Fetch the evaluation results for the job profile
    const results = await this.criteriaInterviewerResultRepository.find({
      where: { criteria_jobProfile_id: { job_profile_id: { id: jobProfileId } } },
      relations: ['criteria_jobProfile_id', 'criteria_jobProfile_id.criteria_id', 'candidate_id'], // Include criteria_jobProfile_id and its relation
    });
  
    // 2. Get all unique candidates and criteria
    const candidates = await this.candidateRepository.find();
    const criteria = await this.criteriaRepository.find();
  
    // 3. Create the 2D array with candidate and criteria names
    const map = [
      ['', ...criteria.map((criterion) => criterion.name)], // First row with criteria names
      ...candidates.map((candidate) => [
        candidate.name,
        ...criteria.map((criterion) => {
          const result = results.find(
            (r) =>
              r.candidate_id.id === candidate.id &&
              r.criteria_jobProfile_id.criteria_id.id === criterion.id, // Access criteria_id through criteria_jobProfile_id
          );
          return result ? result.score : null;
        }),
      ]),
    ];
  
    return map;
  }
}