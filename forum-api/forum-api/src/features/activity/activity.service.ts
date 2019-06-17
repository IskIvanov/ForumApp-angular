import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from '../../data/entities/activity';
import { Repository } from 'typeorm';
import { ActivityDTO } from '../../models/activity/activity.dto';
import { plainToClass } from 'class-transformer';
import { ActivityType } from '../../common/enums/activity-type.enum';
import { FeatureType } from '../../common/enums/feature-type.enum';
import { User } from '../../data/entities/user';

@Injectable()
export class ActivityService {

  public constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) {}

  async getActivities(userID: string): Promise<ActivityDTO[]> {
    const userActivities = await this.activityRepository.find({
      where: { owner: userID },
    });

    if (userActivities.length === 0) {
      throw new BadRequestException(`No subscription record found!`);
    }

    const mappedUserActivity = await userActivities.map( activity => {
    return plainToClass(ActivityDTO, activity);
    });

    return mappedUserActivity;
  }

  async createActivityRecord(detectedOwnerID: User, detectedActionType: ActivityType, detectedFeatureType: FeatureType): Promise<ActivityDTO> {
    const newActivityRecord = new ActivityEntity();
    newActivityRecord.owner = Promise.resolve(detectedOwnerID);
    newActivityRecord.actionType = detectedActionType;
    newActivityRecord.featureType = detectedFeatureType;

    this.activityRepository.save(newActivityRecord);

    return plainToClass(ActivityDTO, newActivityRecord);
  }
}
