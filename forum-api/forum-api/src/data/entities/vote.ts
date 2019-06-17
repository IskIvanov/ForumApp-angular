import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Comment } from './comment';
import { PostEntity } from './post';
import { User } from './user';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vote: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @VersionColumn()
  version: number;

  @ManyToOne(type => User, user => user.votes)
  user: Promise<User>;

  @ManyToOne(type => PostEntity, post => post.votes)
  post: Promise<PostEntity>;

  @ManyToOne(type => Comment, comment => comment.votes)
  comment: Promise<Comment>;
}
