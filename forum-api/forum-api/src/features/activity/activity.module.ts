import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityEntity } from '../../data/entities/activity';
import { PostEntity } from '../../data/entities/post';
import { AuthModule } from '../../auth/auth.module';
import { PostSubscriber } from '../../common/subscribers/post.subscriber';
import { CommentSubscriber } from '../../common/subscribers/comment.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityEntity, PostEntity]),
    AuthModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService, PostSubscriber, CommentSubscriber],
  exports: [ActivityService],
})
export class ActivityModule {}
