import { Comment } from '../../data/entities/comment';
import { Injectable } from '@nestjs/common';
import { EntitySubscriberInterface, Connection, InsertEvent, UpdateEvent } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { ActivityService } from '../../features/activity/activity.service';
import { ActivityType } from '../enums/activity-type.enum';
import { FeatureType } from '../enums/feature-type.enum';

@Injectable()
// @EventSubscriber() <<< pls DO NOT uncomment this ! (left here for testing purposes only)
export class CommentSubscriber implements EntitySubscriberInterface<Comment> {

  constructor(
    @InjectConnection() readonly posts: Connection,
    private readonly activityService: ActivityService,
    ) {
      posts.subscribers.push(this);
    }

  listenTo() {
      return Comment;
  }

  async afterInsert(event: InsertEvent<Comment>): Promise<Comment | string> {
      const detectedEventEntity = await event.entity;
      const actionOwner = await detectedEventEntity.author;
      const actionType = ActivityType.CREATED;
      const actionTarget = FeatureType.COMMENT;
      const result = await this.activityService.createActivityRecord(actionOwner, actionType, actionTarget);

      return 'Activity successfully recorded!';
  }

  async afterUpdate(event: UpdateEvent<Comment>): Promise<Comment | string> {
    const detectedEventEntity = await event.entity;
    const actionOwner = await detectedEventEntity.author;
    const actionType = ActivityType.UPDATED;
    const actionTarget = FeatureType.COMMENT;
    const result = await this.activityService.createActivityRecord(actionOwner, actionType, actionTarget);

    return 'Activity successfully recorded!';
  }
}
