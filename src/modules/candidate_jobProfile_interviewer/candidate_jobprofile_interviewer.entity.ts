import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Candidate } from '../candidate/candidate.entity';
import { JobProfile } from '../job-profile/job-profile.entity';
import { Interviewer } from '../interviewer/interviewer.entity';


@Entity('CandidateJobProfileInterviewer')
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


