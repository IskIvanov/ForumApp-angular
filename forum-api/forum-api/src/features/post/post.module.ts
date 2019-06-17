import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { CoreModule } from '../../core/core.module';
import { PostEntity } from '../../data/entities/post';
import { Vote } from '../../data/entities/vote';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { NotificationEntity } from '../../data/entities/notification';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, Vote, NotificationEntity]),
    AuthModule,
    CoreModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
