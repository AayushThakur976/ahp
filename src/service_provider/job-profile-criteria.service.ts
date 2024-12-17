import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriteriaInterviewerResult } from 'src/modules/criteria_interviewResult_map/criteria_interviewResult_map';
import { Candidate } from 'src/modules/candidate/candidate.entity';
import { Criteria } from 'src/modules/criterias/criterias.entity';
import { PERFORMANCE_LEVELS } from 'src/constants'; // Import the PERFORMANCE_LEVELS constant

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
      relations: ['criteria_jobProfile_id', 'criteria_jobProfile_id.criteria_id', 'candidate_id'],
    });

    // 2. Get all unique candidates and criteria
    const candidates = await this.candidateRepository.find();
    const criteria = await this.criteriaRepository.find();

    // 3. Create the 2D array with candidate and criteria names
    const map = [
      ['', ...criteria.map((criterion) => criterion.name)],
      ...candidates.map((candidate) => [
        candidate.name,
        ...criteria.map((criterion) => {
          const scoresForCriteria = results.filter(
            (r) =>
              r.candidate_id.id === candidate.id &&
              r.criteria_jobProfile_id.criteria_id.id === criterion.id,
          );

          if (scoresForCriteria.length > 1) {
            // Calculate average if there are multiple scores
            const scores = scoresForCriteria.map((r) => PERFORMANCE_LEVELS[r.score]);
            const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
            return averageScore;
          } else if (scoresForCriteria.length === 1) {
            // Use the single score if there's only one
            return PERFORMANCE_LEVELS[scoresForCriteria[0].score];
          } else {
            // No scores found for this candidate and criteria
            return null; 
          }
        }),
      ]),
    ];

    return map;
  }
}