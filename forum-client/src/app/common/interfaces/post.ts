import { PostStatus } from '../enum/post-status.enum';
import { User } from './user';

export interface Post {
  title: string;
  content: string;
  status: PostStatus;
  publishDate: Date;
  author: User;
}
