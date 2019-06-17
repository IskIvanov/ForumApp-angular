import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { UserService } from './user.service';
import { User } from '../../data/entities/user';
import { Ban } from '../../data/entities/ban';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ban]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
