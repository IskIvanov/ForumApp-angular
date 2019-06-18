import { User } from './user';
import { CommentStatus } from '../enum/comment-status.enum';

export interface Comments {
  id: string;
  message: string;
  status: CommentStatus;
  publishDate: Date;
  author: User;
}
