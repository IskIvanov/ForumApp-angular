import { IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryPostDTO {
  @IsOptional()
  @IsString()
  title: string;

  // @IsOptional()
  // @IsString()
  // order: string;
}
