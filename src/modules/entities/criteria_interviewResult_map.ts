import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Criteria } from './criterias.entity';
import { Candidate } from './candidate.entity';

@Entity('criteria_interview_result_map')
export class CriteriaInterviewerResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Criteria, (criteria) => criteria.criteriaResults, {
    onDelete: 'CASCADE', // Deletes this entry when the related Criteria is deleted
    onUpdate: 'CASCADE',
  })
  criteria: Criteria;

  @ManyToOne(() => Candidate, (candidate) => candidate.criteriaResults, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  candidate: Candidate;

  @Column()
  interviewerId: number;

  @Column({nullable:false})
  score: number;
}
