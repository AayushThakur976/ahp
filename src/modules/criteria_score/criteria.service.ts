import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Criteria } from '../entities/criterias.entity';
import { Candidate } from '../entities/candidate.entity';
import { CriteriaInterviewerResult } from '../entities/criteria_interviewResult_map';

@Injectable()
export class CriteriaService {
  constructor(
    @InjectRepository(Criteria)
    private readonly criteriaRepository: Repository<Criteria>,

    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,

    @InjectRepository(CriteriaInterviewerResult)
    private readonly criteriaInterviewerResultRepository: Repository<CriteriaInterviewerResult>,
  ) {}

  async getCriteriaCandidateMap(jobProfileId: string): Promise<any[][]> {
    // Fetch all criteria for the given job profile
    const criterias = await this.criteriaRepository
      .createQueryBuilder('criteria')
      .innerJoin('criteria.jobProfile', 'jobProfile', 'jobProfile.id = :jobProfileId', { jobProfileId })
      .getMany();

    if (!criterias.length) {
      throw new NotFoundException(`No criteria found for Job Profile with ID ${jobProfileId}`);
    }

    // Fetch all candidates for the given job profile
    const candidates = await this.candidateRepository.find({
      where: { jobProfile: { id: jobProfileId } },
    });

    if (!candidates.length) {
      throw new NotFoundException(`No candidates found for Job Profile with ID ${jobProfileId}`);
    }

    // Fetch results for the given job profile
    const results = await this.criteriaInterviewerResultRepository
      .createQueryBuilder('result')
      .innerJoin('result.candidate', 'candidate', 'candidate.jobProfile.id = :jobProfileId', { jobProfileId })
      .innerJoin('result.criteria', 'criteria')
      .select(['result.score AS score', 'candidate.id AS candidateId', 'criteria.id AS criteriaId'])
      .getRawMany();

    if (!results.length) {
      console.warn('No results found for the given job profile.');
    }

    // Create a map for quick lookup of results
    const resultsMap = new Map<string, number>();
    results.forEach((result) => {
      const key = `${result.candidateId}-${result.criteriaId}`;
      resultsMap.set(key, result.score);
    });

    // Construct the 2D array output
    const criteriaCandidateMap: any[][] = [];

    for (const criteria of criterias) {
      const row = candidates.map((candidate) => {
        const key = `${candidate.id}-${criteria.id}`;
        const score = resultsMap.get(key) || null;

        return {
          criteriaName: criteria.name,
          candidateName: candidate.name,
          score, // Assigning score from the map
        };
      });

      criteriaCandidateMap.push(row);
    }

    return criteriaCandidateMap;
  }
}
