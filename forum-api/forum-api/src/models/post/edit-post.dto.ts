import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class EditPostDTO {
  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  content: string;
}
