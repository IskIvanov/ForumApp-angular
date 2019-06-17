import { IsBoolean } from 'class-validator';

export class CreateVoteDTO {
  @IsBoolean()
  vote: boolean;
}
