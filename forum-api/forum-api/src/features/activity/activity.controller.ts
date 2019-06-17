import { Controller, Get, HttpCode, UseGuards, HttpStatus, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AuthGuard } from '@nestjs/passport';
import { ActivityDTO } from '../../models/activity/activity.dto';

@Controller('activity')
export class ActivityController {

  public constructor(private readonly activityService: ActivityService) {}

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getActivities(@Param('userId') userId: string ): Promise<ActivityDTO[] | string> {
    return await this.activityService.getActivities(userId);
  }
}
