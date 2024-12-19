import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CriteriaService } from './criteria.service';

@Controller('criteria')
export class CriteriaController {
  constructor(private readonly criteriaService: CriteriaService) {}

  @Get(':jobProfileId')
  async getCriteriaCandidateMap(@Param('jobProfileId') jobProfileId: string) {
    try {
      return await this.criteriaService.getCriteriaCandidateMap(jobProfileId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
