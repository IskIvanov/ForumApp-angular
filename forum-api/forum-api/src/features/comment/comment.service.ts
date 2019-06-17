import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CommentStatus } from '../../common/enums/comment-status.enum';
import { ModelMappingService } from '../../core/services/model-mapping.service';
import { Comment } from '../../data/entities/comment';
import { PostEntity } from '../../data/entities/post';
import { User } from '../../data/entities/user';
import { Vote } from '../../data/entities/vote';
import { CreateCommentDTO } from '../../models/comment/create-comment.dto';
import { ShowCommentDTO } from '../../models/comment/show-comment.dto';
import { CreateVoteDTO } from '../../models/vote/create-vote.dto';
import { PostStatus } from '../../common/enums/post-status.enum';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class CommentService {
  public constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    private readonly modelMappingService: ModelMappingService,
  ) {}

  async findAll(id: string): Promise<ShowCommentDTO[]> {
    const allCommentsForPost = await this.commentRepository.find({
      where: {
        postId: id,
        status: Not(CommentStatus.ARCHIVED),
      },
      relations: ['author'],
    });

    const returnCommentsForPost = allCommentsForPost.map((comment: Comment) =>
      this.modelMappingService.returnPostComments(comment),
    );
    return await Promise.all(returnCommentsForPost);
  }

  async createComment(
    postId: string,
    user: User,
    comment: CreateCommentDTO,
  ): Promise<ShowCommentDTO> {
    const foundPost: PostEntity = await this.postRepository.findOne(postId);

    if (!foundPost) {
      throw new BadRequestException('No such post exists');
    }

    if (foundPost.status === PostStatus.LOCKED) {
      throw new UnauthorizedException('Can\'t comment on a locked post!');
    }

    const createdComment = new Comment();

    createdComment.message = comment.message;
    createdComment.author = Promise.resolve(user);
    createdComment.post = Promise.resolve(foundPost);

    await this.commentRepository.save(createdComment);

    return await this.modelMappingService.returnPostComments(createdComment);
  }

  async editComment(
    commentId: string,
    user: User,
    editedComment: CreateCommentDTO,
  ): Promise<ShowCommentDTO> {
    const foundComment = await this.commentRepository.findOne(commentId, {
      relations: ['author'],
      where: { status: Not(CommentStatus.ARCHIVED) },
    });

    if (!foundComment || foundComment.status === CommentStatus.ARCHIVED) {
      throw new BadRequestException('No such post exists');
    }

    if (foundComment.status === CommentStatus.LOCKED) {
      throw new UnauthorizedException('Can\'t edit a locked comment!');
    }

    const foundCommentAuthor = await foundComment.author;

    if (foundCommentAuthor.id !== user.id) {
      throw new BadRequestException('Unauthorized to edit comment!');
    }

    foundComment.message = editedComment.message;
    await this.commentRepository.update(foundComment.id, foundComment);

    return this.modelMappingService.returnPostComments(foundComment);
  }

  async archiveComment(commentId: string, user: User): Promise<string> {
    const foundComment = await this.commentRepository.findOne({
      relations: ['post'],
      where: { id: commentId },
    });

    if (!foundComment || foundComment.status === CommentStatus.ARCHIVED) {
      throw new BadRequestException('No such post exists');
    }

    if (foundComment.status === CommentStatus.LOCKED) {
      throw new UnauthorizedException('Comment already locked!');
    }

    const foundCommentAuthor = await foundComment.author;
    if (foundCommentAuthor.id !== user.id  && (!user.roles.includes(UserRole.ADMIN))) {
      throw new BadRequestException('Unauthorized to delete comment!');
    }

    await this.commentRepository.update(commentId, {
      status: CommentStatus.ARCHIVED,
    });
    return `Comment with ID: ${commentId} deleted!`;
  }

  async castVote(
    commentId: string,
    postId: string,
    votingUser: User,
    castVote: CreateVoteDTO,
  ): Promise<string> {
    const foundComment = await this.commentRepository.findOne(commentId);

    if (!foundComment) {
      throw new BadRequestException('No such comment exists');
    }

    if (foundComment.status === CommentStatus.LOCKED) {
      throw new UnauthorizedException('Can\'t vote on a locked comment!');
    }

    const foundPost = await this.postRepository.findOne(postId);

    if (!foundPost) {
      throw new BadRequestException('No such post exists');
    }

    const foundPostComments = await foundPost.comments;
    const commentsIds = foundPostComments.map(comment => comment.id);

    if (!commentsIds.includes(commentId)) {
      throw new BadRequestException(
        'The comment does not belong to this post!',
      );
    }

    const checkIfVoted: Vote = await this.voteRepository.findOne({
      where: { user: votingUser, comment: foundComment },
    });

    if (checkIfVoted) {
      if (checkIfVoted.vote === castVote.vote) {
        await this.voteRepository.remove(checkIfVoted);
        return 'vote deleted';
      }
      checkIfVoted.vote = castVote.vote;
      await this.voteRepository.update(checkIfVoted.id, checkIfVoted);
      return `vote changed`;
    }
    const vote = new Vote();
    vote.comment = Promise.resolve(foundComment);
    vote.user = Promise.resolve(votingUser);
    vote.vote = castVote.vote;

    await this.voteRepository.save(vote);
    return `voted`;
  }
}
