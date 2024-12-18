import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Candidate } from './candidate.entity';
import { JobProfile } from './job-profile.entity';
import { Interviewer } from './interviewer.entity';


@Entity('candidate_jobprofile_interviewer')
export class CandidateJobProfileInterviewer extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Candidate, (candidate) => candidate.id)
    candidate_id: Candidate

    @ManyToOne(() => JobProfile, (jobprofile) => jobprofile.id)
    job_profile_id: JobProfile

    @ManyToOne(() => Interviewer, (interviewer) => interviewer.id)
    interviewer_id: Interviewer

   
}


