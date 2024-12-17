import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('criteria')
export class Criteria extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
   name:string;
}
