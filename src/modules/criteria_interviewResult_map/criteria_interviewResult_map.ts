import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToOne } from 'typeorm';
import { Candidate } from '../candidate/candidate.entity';
import { Interviewer } from '../interviewer/interviewer.entity';
import { Criteria } from '../criterias/criterias.entity';
import { CriteriasJobProfile } from '../job-criteria-map/job-criteria-map.entity';
import { CandidateJobProfileInterviewer } from '../candidate_jobProfile_interviewer/candidate_jobprofile_interviewer.entity';


@Entity('criteria_interviewer_result')
export class CriteriaInterviewerResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => CriteriasJobProfile, (jobprofile) => jobprofile.id)
  criteria_jobProfile_id: CriteriasJobProfile;

  @ManyToOne(() => Candidate, (candidate) => candidate.id)
  candidate_id: Candidate; 

  @ManyToOne(() => Interviewer, (interviewer) => interviewer.id)
  interviewer_id: Interviewer;

  @Column()
  score: number;
}