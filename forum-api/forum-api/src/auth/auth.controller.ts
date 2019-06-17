import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../core/services/users.service';
import { UserLoginDTO } from '../models/user/user-login-dto';
import { UserRegisterDTO } from '../models/user/user-register-dto';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    user: UserLoginDTO,
  ): Promise<{ token: string }> {
    const token = await this.authService.signIn(user);
    if (!token) {
      throw new BadRequestException(`Wrong credentials!`);
    }

    return { token };
  }

  @Post('register')
  async register(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    user: UserRegisterDTO,
  ): Promise<string | {}>{
    await this.usersService.register(user);
    return {message: 'Succesfully registered'};
  }

  // @UseGuards(AuthGuard())   TODO - only logged in users can be able to log out
  @Delete('logout')
  async logout(): Promise<string | {}>  {
    return {message: 'Successfully logged out'};
  }
}
