import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { Comment } from '../../data/entities/comment';
import { PostEntity } from '../../data/entities/post';
import { User } from '../../data/entities/user';
import { Vote } from '../../data/entities/vote';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, PostEntity, User, Vote]),
    AuthModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
