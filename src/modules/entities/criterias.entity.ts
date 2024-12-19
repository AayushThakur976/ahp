import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { JobProfile } from './job-profile.entity';
import { CriteriaInterviewerResult } from './criteria_interviewResult_map';

@Entity('criterias')
export class Criteria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => JobProfile, (jobProfile) => jobProfile.criteria, {
    onDelete: 'CASCADE', // Deletes associated criteria when the JobProfile is deleted
    onUpdate: 'CASCADE', // Updates the criteria's jobProfileId if the JobProfile is updated
  })
  jobProfile: JobProfile;

  @OneToMany(() => CriteriaInterviewerResult, (result) => result.criteria, {
    cascade: true, // Automatically handles related CriteriaInterviewerResult entities
  })
  criteriaResults: CriteriaInterviewerResult[];
}
