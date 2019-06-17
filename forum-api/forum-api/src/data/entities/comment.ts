import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CommentStatus } from '../../common/enums/comment-status.enum';
import { PostEntity } from './post';
import { User } from './user';
import { Vote } from './vote';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  message: string;

  @Column({
    type: 'enum',
    enum: CommentStatus,
    default: CommentStatus.PUBLISHED,
  })
  status: CommentStatus;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @VersionColumn()
  version: number;

  @ManyToOne(type => User, user => user.comments)
  author: Promise<User>;

  @ManyToOne(type => PostEntity, post => post.comments)
  post: Promise<PostEntity>;

  @OneToMany(type => Vote, vote => vote.comment)
  votes: Promise<Vote[]>;
}
