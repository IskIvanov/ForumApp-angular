import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Role } from '../data/entities/role';
import { User } from '../data/entities/user';
import { ModelMappingService } from './services/model-mapping.service';
import { UsersService } from './services/users.service';
import { Ban } from '../data/entities/ban';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ban])],
  providers: [UsersService, ModelMappingService, ModelMappingService],
  exports: [UsersService, ModelMappingService],
})
export class CoreModule {}
