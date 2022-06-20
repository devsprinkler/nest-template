import { Module } from '@nestjs/common';
import { UserCreateService } from '@src/api/user/service/user.create';
import { UserReadService } from '@src/api/user/service/user.read';
import { UserController } from '@src/api/user/user.controller';
import { UserUpdateService } from '@src/api/user/service/user.update';
import { UserSessionService } from './common/session';

@Module({
  controllers: [UserController],
  providers: [
    UserCreateService,
    UserReadService,
    UserUpdateService,
    UserSessionService,
  ],
})
export class UserModule {}
