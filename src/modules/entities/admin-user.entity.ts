import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('admin')
export class AdminUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
