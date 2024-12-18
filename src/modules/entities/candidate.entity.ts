import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('candidate')
export class Candidate {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;


}
