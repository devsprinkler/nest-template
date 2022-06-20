import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/api/user/model/user.entity';
import { UserCreateService } from '@src/api/user/service/user.create';
import { UserReadService } from '@src/api/user/service/user.read';
import { UserController } from '@src/api/user/user.controller';
import { UserUpdateService } from '@src/api/user/service/user.update';
import { RedisModule } from '@src/common/database/redis/redis.module';
import { RedisService } from '@src/common/database/redis/redis.service';
import { UserSessionService } from './common/session';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule],
  controllers: [UserController],
  providers: [
    UserCreateService,
    UserReadService,
    UserUpdateService,
    UserSessionService,
    RedisService,
  ],
})
export class UserModule {}
