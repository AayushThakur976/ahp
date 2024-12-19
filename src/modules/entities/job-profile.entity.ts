import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Candidate } from './candidate.entity';
import { Criteria } from './criterias.entity';

@Entity('job_profile')
export class JobProfile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  department: string;

  @OneToMany(() => Candidate, (candidate) => candidate.jobProfile)
  candidates: Candidate[];

  @OneToMany(() => Criteria, (criteria) => criteria.jobProfile)
  criteria: Criteria[]; // Reverse relationship for the ManyToOne in Criteria
}
