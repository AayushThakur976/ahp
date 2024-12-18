import { Entity, PrimaryGeneratedColumn, Column ,ManyToOne, BaseEntity} from 'typeorm';
import { Criteria } from './criterias.entity';
import { JobProfile } from './job-profile.entity';


@Entity('criterias_job_profile')
export class CriteriasJobProfile extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: string;
   
  @ManyToOne(() => Criteria, (criteria) => criteria.id)
  criteria_id: Criteria;

  @ManyToOne(() => JobProfile, (jobProfile) => jobProfile.id)
  job_profile_id: string; 
  

  
}
