import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user';

@Entity('ban')
export class Ban {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: 0})
  isBanned: boolean;

  @Column()
  description: string;

  @OneToOne(type => User, user => user.banStatus)
  user: Promise<User>;
}
