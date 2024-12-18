// criteria_interviewer_result.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Candidate } from './candidate.entity';
import { Interviewer } from './interviewer.entity';
import { Criteria } from './criterias.entity';

@Entity('criteria_interviewer_result')
export class CriteriaInterviewerResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Criteria, (criteria) => criteria.id)
  criteria_id: Criteria; 

  @ManyToOne(() => Candidate, (candidate) => candidate.id) 
  candidate_id: Candidate; // This line is correct

  @ManyToOne(() => Interviewer, (interviewer) => interviewer.id)
  interviewer_id: Interviewer;

  @Column()
  score: number;
}