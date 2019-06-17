import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { CommentStatus } from '../../common/enums/comment-status.enum';
import { ShowUserDTO } from '../user/show-user.dto';

export class ShowCommentDTO {
  @IsString()
  @Expose()
  id: string;
  @IsString()
  @Expose()
  message: string;

  @IsEnum(CommentStatus)
  status: CommentStatus;

  @IsDate()
  @Expose()
  publishDate: Date;

  @Type(() => ShowUserDTO)
  @Expose()
  author: ShowUserDTO;
}
