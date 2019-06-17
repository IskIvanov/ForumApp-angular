import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class BanDTO {
  @IsString()
  @Expose()
  description: string;
}