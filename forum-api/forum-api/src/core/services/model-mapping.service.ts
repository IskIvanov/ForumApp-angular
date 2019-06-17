import { Injectable } from '@nestjs/common';
import { Comment } from '../../data/entities/comment';
import { PostEntity } from '../../data/entities/post';
import { ShowCommentDTO } from '../../models/comment/show-comment.dto';
import { ShowPostDTO } from '../../models/post/show-post.dto';

@Injectable()
export class ModelMappingService {
  async returnPost(post: PostEntity): Promise<ShowPostDTO> {
    const postAuthor = (post as any).__author__;
    return {
      title: post.title,
      content: post.content,
      publishDate: post.createdOn,
      status: post.status,
      id: post.id,
      author: {
        id: postAuthor.id,
        username: postAuthor.name,
        registerDate: postAuthor.createdOn,
      },
    };
  }

  async returnPostComments(comment: Comment): Promise<ShowCommentDTO> {
    const commentAuthor = (comment as any).__author__;

    return {
      id: comment.id,
      message: comment.message,
      status: comment.status,
      publishDate: comment.createdOn,
      author: {
        id: commentAuthor.id,
        username: commentAuthor.name,
        registerDate: commentAuthor.createdOn,
      },
    };
  }
}
