import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  @Expose()
  message: string;
}
