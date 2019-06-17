import { Controller, Get, HttpStatus, HttpCode, UseGuards, Req, Param, Delete, Post, Request, Body, ValidationPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ShowUserDTO } from '../../models/user/show-user.dto';
import { BanDTO } from '../../models/ban/ban.dto';
// import { Roles } from '../../common/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getMySubscribers(@Req() request: any): Promise<ShowUserDTO[] | string> {
    return await this.userService.getSubscribersForLoggedInUser(request.user);
  }

  @Put('/:userID/subscription')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async subscribe(
    @Param() userTargetedForSubscription: string,
    @Req() request: any): Promise<{}> {
    return await this.userService.subscribe(userTargetedForSubscription, request.user);
  }

  @Get('/:userID/subscribers')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getSubscribers(@Param('id') targetedUser: string): Promise<ShowUserDTO[] | string> {
    return await this.userService.getSubscribersForGivenUser(targetedUser);
  }

  @Delete('/:userID/ban')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  // @Roles('Admin')
  async banUser(
    @Param('userID') userID: string,
    @Req() request: any,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    description: BanDTO,
    ): Promise<any> {
      return await this.userService.banUser(userID, description, request.user);
  }

  @Delete('/:userID/delete')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  // @Roles('Admin')
  async deleteUser(
    @Param('userID') userID: string,
    @Req() request: any,
  ): Promise<string> {
    return this.userService.deleteUser(userID, request.user);
  }
}
