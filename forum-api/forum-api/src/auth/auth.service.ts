import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../core/services/users.service';
import { UserLoginDTO } from '../models/user/user-login-dto';
import { JwtPayload } from '../core/interfaces/jwt-payload';
import { User } from '../data/entities/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(user: UserLoginDTO): Promise<string> {
    const userFound = await this.usersService.signIn(user);

    if (userFound) {
      return await this.jwtService.sign({email: userFound.email});
    }

    return null;
  }

  async validateUser(payload: JwtPayload): Promise<User | undefined> {
    return await this.usersService.validate(payload);
  }
}
