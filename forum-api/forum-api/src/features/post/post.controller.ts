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
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDTO } from '../../models/post/create-post.dto';
import { EditPostDTO } from '../../models/post/edit-post.dto';
import { ShowPostDTO } from '../../models/post/show-post.dto';
import { CreateVoteDTO } from '../../models/vote/create-vote.dto';
import { PostService } from './post.service';
import { QueryPostDTO } from '../../models/post/query-post.dto';

@Controller('posts')
export class PostController {
  public constructor(private readonly postService: PostService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPosts(@Query() query: QueryPostDTO): Promise<ShowPostDTO[] | string> {
    return await this.postService.getAllPosts(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard())
  async createPost(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    post: CreatePostDTO,
    @Req() request: any,
  ): Promise<ShowPostDTO> {
    return await this.postService.createPost(post, request.user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async editPost(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    post: EditPostDTO,
    @Req() request: any,
  ): Promise<ShowPostDTO> {
    return await this.postService.editPost(id, post, request.user);
  }

  @Put(':id/flag')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async flagPost(
    @Param('postID') postID: string,
    @Req() request: any,
    @Body() reason: string,
  ): Promise<ShowPostDTO | string> {
    return await this.postService.flagPost(postID, request.user, reason);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<ShowPostDTO> {
    return await this.postService.findOnePost(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async archivePost(
    @Param('id') postId: string,
    @Req() request: any,
  ): Promise<string> {
    return this.postService.archivePost(postId, request.user);
  }

  @Put(':id/lock')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async lockPost(
    @Param('id') postId: string,
    @Req() request: any,
  ): Promise<string> {
    return this.postService.lockPost(postId, request.user);
  }

  @Put(':id/votes')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async castVote(
    @Param() id: string,
    @Req() request: any,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    vote: CreateVoteDTO,
  ): Promise<string> {
    return await this.postService.castVote(id, request.user, vote);
  }
}
