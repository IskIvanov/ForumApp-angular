import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, VersionColumn, OneToOne, ManyToOne } from 'typeorm';
import { ActivityType } from '../../common/enums/activity-type.enum';
import { FeatureType } from '../../common/enums/feature-type.enum';
import { User } from './user';

@Entity('activities')
export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, user => user.activities)
  owner: Promise<User>;

  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  actionType: ActivityType;

  @Column({
    type: 'enum',
    enum: FeatureType,
  })
  featureType: FeatureType;

  @CreateDateColumn()
  createdOn: Date;

  @VersionColumn()
  version: number;
}
