import { IsEnum } from 'class-validator';
import { ShowUserDTO } from '../user/show-user.dto';
import { FeatureType } from '../../common/enums/feature-type.enum';
import { ActivityType } from '../../common/enums/activity-type.enum';
import { Type } from 'class-transformer';

export class ActivityDTO {
  @Type(type => ShowUserDTO)
  owner: ShowUserDTO;

  @IsEnum(ActivityType)
  actionType: ActivityType;

  @IsEnum(FeatureType)
  featureType: FeatureType;

  @Type(type => Date)
  createdOn: Date;
}
