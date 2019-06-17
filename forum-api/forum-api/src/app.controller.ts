import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './common/guards/roles.guard';
import { UserRole } from './common/enums/user-role.enum';
import { Roles } from './common/decorators/roles.decorator';
import { User } from './common/decorators/user.decorator';

@Controller()
export class AppController {
  @Get()
  @UseGuards(AuthGuard())
  root(@User() authenticatedUser) {
    //console.log(authenticatedUser);
    return {
      data: `Yay, you're logged in!`,
    };
  }

  @Get('/admin')
  @Roles(UserRole.BASIC)
  @UseGuards(AuthGuard(), RolesGuard)
  admin(@User() authenticatedUser) {
    //console.log(authenticatedUser);
    return {
      data: `Yay, you are an admin!`,
    };
  }
}
