import { Injectable, Inject } from '@nestjs/common';
import { EntitySubscriberInterface, InsertEvent, Connection, UpdateEvent } from 'typeorm';
import { PostEntity } from '../../data/entities/post';
import { InjectConnection } from '@nestjs/typeorm';
import { ActivityService } from '../../features/activity/activity.service';
import { ActivityType } from '../enums/activity-type.enum';
import { FeatureType } from '../enums/feature-type.enum';

@Injectable()
// @EventSubscriber() <<< pls DO NOT uncomment this ! (left here for testing purposes only)
export class PostSubscriber implements EntitySubscriberInterface<PostEntity> {

  constructor(
    @InjectConnection() readonly posts: Connection,
    private readonly activityService: ActivityService,
    ) {
      posts.subscribers.push(this);
    }

  listenTo() {
      return PostEntity;
  }

  async afterInsert(event: InsertEvent<PostEntity>): Promise<PostEntity | string> {
      const detectedEventEntity = await event.entity;
      const actionOwner = await detectedEventEntity.author;
      const actionType = ActivityType.CREATED;
      const actionTarget = FeatureType.POST;
      const result = await this.activityService.createActivityRecord(actionOwner, actionType, actionTarget);

      return 'Activity successfully recorded!';
  }

  async afterUpdate(event: UpdateEvent<PostEntity>): Promise<PostEntity | string> {
    const detectedEventEntity = await event.entity;
    const actionOwner = await detectedEventEntity.author;
    const actionType = ActivityType.UPDATED;
    const actionTarget = FeatureType.COMMENT;
    const result = await this.activityService.createActivityRecord(actionOwner, actionType, actionTarget);

    return 'Activity successfully recorded!';
  }

}
