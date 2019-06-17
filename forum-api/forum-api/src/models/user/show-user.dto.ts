import { Expose } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class ShowUserDTO {
  @IsString()
  @Expose()
  username: string;

  @IsString()
  @Expose()
  id: string;

  @IsDate()
  @Expose()
  registerDate: Date;
}
