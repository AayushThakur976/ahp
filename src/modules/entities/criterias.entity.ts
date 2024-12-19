import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CriteriasJobProfile } from './job-criteria-map.entity';

@Entity('criterias')
export class Criteria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Relation to CriteriasJobProfile (mapping table)
  @OneToMany(() => CriteriasJobProfile, (criteriaJobProfile) => criteriaJobProfile.criteria)
  criteriasJobProfiles: CriteriasJobProfile[];
}
