import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { CriteriasJobProfile } from './job-criteria-map.entity';

@Entity('job_profile')
export class JobProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;  // This will be a string ID as per your original definition

  @Column()
  name: string;

  @Column()
  department: string;

  // Add any other relations if necessary
}
