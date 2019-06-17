import { BadRequestException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, Equal } from 'typeorm';
import { PostStatus } from '../../common/enums/post-status.enum';
import { ModelMappingService } from '../../core/services/model-mapping.service';
import { PostEntity } from '../../data/entities/post';
import { User } from '../../data/entities/user';
import { Vote } from '../../data/entities/vote';
import { CreatePostDTO } from '../../models/post/create-post.dto';
import { ShowPostDTO } from '../../models/post/show-post.dto';
import { CreateVoteDTO } from '../../models/vote/create-vote.dto';
import { NotificationEntity } from '../../data/entities/notification';
import { QueryPostDTO } from '../../models/post/query-post.dto';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class PostService {
  public constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    private readonly modelMappingService: ModelMappingService,
  ) {}

  async getAllPosts(query: QueryPostDTO): Promise<ShowPostDTO[] | string> {
    // TODO sort results and pagination
    if (query) {
      if (query.title) {
        const queriedPosts = await this.postRepository.find({
          where: {
            status: Not(PostStatus.ARCHIVED),
            title: Equal(query.title),
          },
          relations: ['author'],
        });

        if (queriedPosts.length === 0) {
          throw new NotFoundException('Post with this title was not found. Please try again.');
        }

        const mappedPosts = queriedPosts.map((post: PostEntity) => this.modelMappingService.returnPost(post));
        return await Promise.all(mappedPosts);
      }
    }

    const foundPost = await this.postRepository.find({
      where: { status: Not(PostStatus.ARCHIVED) },
      relations: ['author'],
    });

    const returnPosts = foundPost.map((post: PostEntity) =>
      this.modelMappingService.returnPost(post),
    );

    return await Promise.all(returnPosts);
  }

  async findOnePost(id: string): Promise<ShowPostDTO> {
    const foundPost = await this.postRepository.findOne(id, {
      relations: ['author', 'comments', 'comments.author'],
      where: {
        status: Not(PostStatus.ARCHIVED),
      },
    });

    if (!foundPost) {
      throw new BadRequestException('No such post exists');
    }

    return this.modelMappingService.returnPost(foundPost);
  }

  async createPost(post: CreatePostDTO, user: User): Promise<ShowPostDTO> {
    const newPost = await this.postRepository.create(post);
    newPost.author = Promise.resolve(user);

    /* if (user.banStatus.isBanned === null || !user.banStatus.isBanned) {
      await this.postRepository.save(newPost);
      return plainToClass(ShowPostDTO, newPost);
    }

    if (user.banStatus.isBanned && user.isDeleted) {
      throw new BadRequestException('User is banned or deleted!');
    }  */
    await this.postRepository.save(newPost);

    return await this.modelMappingService.returnPost(newPost);
  }

  async editPost(
    id: string,
    post: CreatePostDTO,
    user: User,
  ): Promise<ShowPostDTO> {
    // TODO admins or author can edit/delete posts
    const foundPost = await this.postRepository.findOne(id, {
      relations: ['author'],
      where: [{ status: Not(PostStatus.ARCHIVED) },
        { status: Not(PostStatus.LOCKED) } ],
    });

    if (!foundPost) {
      throw new NotFoundException('No such post exists. Or maybe the post is locked by admin. Please contact us if such is the case.');
    }

    const foundPostAuthor = await foundPost.author;
    if (foundPostAuthor.id !== user.id) {
      throw new UnauthorizedException('Unauthorized to edit post!');
    }

    foundPost.title = post.title;
    foundPost.content = post.content;

    await this.postRepository.save(foundPost);

    return await this.modelMappingService.returnPost(foundPost);
  }

  async archivePost(postId: string, user: User): Promise<string> {
    // TODO only the author and admins can edit/delete posts
    const foundPost = await this.postRepository.findOne({
      relations: ['author'],
      where: { id: postId },
    });

    if (!foundPost || foundPost.status === PostStatus.ARCHIVED) {
      throw new BadRequestException('No such post exists');
    }

    const foundPostAuthor = await foundPost.author;
    if ((foundPostAuthor.id !== user.id) && (!user.roles.includes(UserRole.ADMIN)) ) {
      throw new UnauthorizedException('Unauthorized to edit post!');
    }

    foundPost.status = PostStatus.ARCHIVED;
    await this.postRepository.save(foundPost);

    return `Post with ID: ${postId} was deleted!`;
  }

  async lockPost(postId: string, user: User): Promise<string> {
    // TODO only the author and admins can edit/delete posts
    const foundPost = await this.postRepository.findOne({
      relations: ['author'],
      where: { id: postId },
    });

    if (!foundPost || foundPost.status === PostStatus.LOCKED) {
      throw new BadRequestException('No such post exists');
    }

    const foundPostAuthor = await foundPost.author;
    if (foundPostAuthor.id !== await user.id) {
      throw new UnauthorizedException('Unauthorized to edit post!');
    }

    foundPost.status = PostStatus.LOCKED;
    await this.postRepository.save(foundPost);

    return `Post with ID: ${postId} was locked!`;

  }

  async flagPost(postID: string, loggedInUser: User, providedReason: string ): Promise<ShowPostDTO | string> {
    const targetedPost = await this.postRepository.findOne(postID);
    let message = '';

    if (!targetedPost || targetedPost.status === PostStatus.ARCHIVED) {
      throw new NotFoundException('No such post exists');
    }
    if (targetedPost.status === PostStatus.FLAGGED) {
      targetedPost.status = PostStatus.PUBLISHED;
      message = `This post is now unflagged!`;
    } else {
      targetedPost.status = PostStatus.FLAGGED;
      message = `This post is now flagged! An admin has been notified.`;

      // creating a notification about the flag
      const newNotification: NotificationEntity = new NotificationEntity();
      newNotification.reason = providedReason;
      newNotification.reportedBy = loggedInUser.id;
      await this.notificationRepository.save(newNotification);
    }
    await this.postRepository.save(targetedPost);

    return message;
  }

  async castVote(
    postId: string,
    votingUser: User,
    castVote: CreateVoteDTO,
  ): Promise<string> {
    const foundPost = await this.postRepository.findOne(postId);
    if (!foundPost) {
      throw new BadRequestException('No such post exists');
    }

    const checkIfLiked: Vote = await this.voteRepository.findOne({
      where: { user: votingUser, post: foundPost },
    });

    if (checkIfLiked) {
      if (checkIfLiked.vote === castVote.vote) {
        await this.voteRepository.remove(checkIfLiked);
        return 'vote deleted';
      }
      checkIfLiked.vote = castVote.vote;
      await this.voteRepository.update(checkIfLiked.id, checkIfLiked);
      return `vote changed`;
    }
    const vote = new Vote();
    vote.post = Promise.resolve(foundPost);
    vote.user = Promise.resolve(votingUser);
    vote.vote = castVote.vote;

    await this.voteRepository.save(vote);
    return `voted`;
  }
}
