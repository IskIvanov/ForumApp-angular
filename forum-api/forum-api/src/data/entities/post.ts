import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { PostStatus } from '../../common/enums/post-status.enum';
import { Comment } from './comment';
import { User } from './user';
import { Vote } from './vote';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('nvarchar')
  title: string;

  @Column('nvarchar')
  content: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.PUBLISHED,
  })
  status: PostStatus;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @VersionColumn()
  version: number;

  @ManyToOne(type => User, user => user.posts)
  author: Promise<User>;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Promise<Comment[]>;

  @OneToMany(type => Vote, vote => vote.post)
  votes: Promise<Vote[]>;
}
