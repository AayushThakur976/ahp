import { Controller, Get, Param } from '@nestjs/common';
import { CriteriaService } from './job-profile.service';  // Make sure the service is correctly imported

@Controller('job-profiles')
export class JobProfileController {
  constructor(private readonly criteriaService: CriteriaService) {}

  @Get(':id/criterias')  // This is the route for fetching criteria for a specific job profile
  async getCriteriasForJobProfile(@Param('id') id: string) {
    console.log('Received Job Profile ID:', id);  // Debug log to ensure the ID is passed correctly
    return await this.criteriaService.getCriteriaForJobProfile(id);
  }
}
