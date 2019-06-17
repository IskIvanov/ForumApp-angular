import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Comment } from './comment';
import { PostEntity } from './post';
// import { Role } from './role';
import { Vote } from './vote';
import { Ban } from './ban';
import { NotificationEntity } from './notification';
import { ActivityEntity } from './activity';
import { UserRole } from '../../common/enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('nvarchar')
  name: string;

  @Column('nvarchar')
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.BASIC,
  })
  roles: UserRole;

  @OneToOne(type => Ban, ban => ban.user, {eager: true})
  @JoinColumn()
  banStatus: Ban;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @VersionColumn()
  version: number;

  @OneToMany(type => PostEntity, post => post.author)
  posts: Promise<PostEntity[]>;

  @OneToMany(type => Comment, comment => comment.author)
  comments: Promise<Comment[]>;

  @ManyToMany(type => User, user => user.followers)
  following: Promise<User[]>;

  @JoinTable()
  @ManyToMany(type => User, user => user.following)
  followers: Promise<User[]>;

  @OneToMany(type => Vote, vote => vote.user)
  votes: Promise<Vote[]>;

  @ManyToOne(type => NotificationEntity, notification => notification.admins)
  notifications: Promise<NotificationEntity[]>;

  @OneToMany(type => ActivityEntity, activity => activity.owner)
  activities: Promise<ActivityEntity[]>;
}
