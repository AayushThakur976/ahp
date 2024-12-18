import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { JobProfile } from './job-profile.entity';
import { Candidate } from './candidate.entity';
import { Interviewer } from './interviewer.entity';

@Entity()
export class JobProfileCandidate extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Interviewer, { eager: true, nullable: false })
  @JoinColumn({ name: 'interviewerId' })  // Customize foreign key column name if needed
  interviewer: Interviewer;

  @ManyToOne(() => Candidate, { eager: true, nullable: false })
  @JoinColumn({ name: 'candidateId' })  // Customize foreign key column name if needed
  candidate: Candidate;

  @ManyToOne(() => JobProfile, { eager: true, nullable: false })
  @JoinColumn({ name: 'jobProfileId' })  // Customize foreign key column name if needed
  jobProfile: JobProfile;

  @Column()
  round: number;

  @Column('date')
  interviewDate: string;

  @Column('text', { nullable: true })
  comments: string;

  @Column('int', { nullable: false })  // Adjust type as per the requirement
  score: number;
}
