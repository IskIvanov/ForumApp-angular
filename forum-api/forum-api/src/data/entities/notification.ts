import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, VersionColumn, OneToMany } from 'typeorm';
import { NotificationStatus } from '../../common/enums/notification-status';
import { User } from './user';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('nvarchar')
  reason: string;

  @Column()
  reportedBy: string;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.UNREAD,
  })
  status: NotificationStatus;

  @CreateDateColumn()
  createdOn: Date;

  @VersionColumn()
  version: number;

  @OneToMany(type => User, user => user.notifications)
  admins: Promise<User>;
}
