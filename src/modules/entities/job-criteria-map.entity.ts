import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JobProfile } from './job-profile.entity';
import { Criteria } from './criterias.entity';

@Entity('job_criteria')
export class CriteriasJobProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobProfile, (jobProfile) => jobProfile.id)
  @JoinColumn({ name: 'jobProfileId' })
  jobProfile: JobProfile;

  @ManyToOne(() => Criteria, (criteria) => criteria.id)
  @JoinColumn({ name: 'criteriaId' })
  criteria: Criteria;
}
