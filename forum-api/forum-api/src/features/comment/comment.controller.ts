import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDTO } from '../../models/comment/create-comment.dto';
import { ShowCommentDTO } from '../../models/comment/show-comment.dto';
import { CreateVoteDTO } from '../../models/vote/create-vote.dto';
import { CommentService } from './comment.service';

@UseGuards(AuthGuard())
@Controller('posts/:id/comments')
export class CommentController {
  public constructor(private readonly commentService: CommentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllCommentsForPost(
    @Param() postId: string,
  ): Promise<ShowCommentDTO[]> {
    return await this.commentService.findAll(postId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createComment(
    @Param() postId: string,
    @Req() request: any,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    comment: CreateCommentDTO,
  ): Promise<ShowCommentDTO> {
    return this.commentService.createComment(postId, request.user, comment);
  }

  @Put(':commentId')
  @HttpCode(HttpStatus.OK)
  async editComment(
    @Param('commentId') commentId: string,
    @Req() request: any,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    comment: CreateCommentDTO,
  ): Promise<ShowCommentDTO> {
    return this.commentService.editComment(commentId, request.user, comment);
  }

  @Delete(':commentId/delete')
  @HttpCode(HttpStatus.OK)
  async archivedComment(
    @Param('commentId') commentId: string,
    @Req() request: any,
  ): Promise<string> {
    return this.commentService.archiveComment(commentId, request.user);
  }

  @Put(':commentId/votes')
  @HttpCode(HttpStatus.OK)
  async castVote(
    @Param('commentId') commentId: string,
    @Param('id') postId: string,
    @Req() request: any,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    vote: CreateVoteDTO,
  ): Promise<string> {
    return await this.commentService.castVote(
      commentId,
      postId,
      request.user,
      vote,
    );
  }
}
