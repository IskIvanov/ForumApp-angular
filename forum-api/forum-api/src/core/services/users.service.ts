import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../../data/entities/user';
import { UserLoginDTO } from '../../models/user/user-login-dto';
import { UserRegisterDTO } from '../../models/user/user-register-dto';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signIn(user: UserLoginDTO): Promise<User | undefined> {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (!foundUser) {
      return null;
    }
    const passCheck = await bcrypt.compare(user.password, foundUser.password);

    if (passCheck) {
      return foundUser;
    }
    return null;
  }

  async register(user: UserRegisterDTO): Promise<User | undefined> {
    user.password = await bcrypt.hash(user.password, 10);

    const savedUser = await this.userRepository.save({
      ...user,
    });

    return savedUser;
  }

  async validate(payload: JwtPayload): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        ...payload,
      },
    });
  }
}
