import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { JobProfile } from './job-profile.entity';

@Entity('candidate')
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number; // Changed to number for consistency

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => JobProfile, (jobProfile) => jobProfile.candidates)
  @JoinColumn({ name: 'jobProfileId' })
  jobProfile: JobProfile;
  criteriaResults: any;
}
