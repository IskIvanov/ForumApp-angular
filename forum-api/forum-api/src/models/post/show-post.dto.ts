import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { PostStatus } from '../../common/enums/post-status.enum';
import { ShowUserDTO } from '../user/show-user.dto';

export class ShowPostDTO {
  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  content: string;

  @IsString()
  @Expose()
  id: string;

  @IsEnum(PostStatus)
  status: PostStatus;

  @IsDate()
  @Expose()
  publishDate: Date;

  @Type(() => ShowUserDTO)
  @Expose()
  author: ShowUserDTO;
}
