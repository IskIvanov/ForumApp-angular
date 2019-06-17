import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CoreModule } from './core/core.module';
import { CommentModule } from './features/comment/comment.module';
import { CommentService } from './features/comment/comment.service';
import { PostModule } from './features/post/post.module';
import { PostService } from './features/post/post.service';
import { UserModule } from './features/user/user.module';
import { UserService } from './features/user/user.service';
import { ActivityController } from './features/activity/activity.controller';
import { ActivityService } from './features/activity/activity.service';
import { ActivityModule } from './features/activity/activity.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.dbType as any,
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUsername,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: ['./src/data/entities/*.ts'],
        subscribers: ['./src/common/subscribers/*.ts'],
      }),
    }),
    PostModule,
    CommentModule,
    UserModule,
    ActivityModule,
  ],
  controllers: [AppController, ActivityController],
  providers: [PostService, CommentService, UserService, ActivityService],
})
export class AppModule {}
