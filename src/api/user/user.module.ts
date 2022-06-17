import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/api/user/model/user.entity';
import { UserCreateService } from '@src/api/user/service/user.create';
import { UserReadService } from '@src/api/user/service/user.read';
import { UserController } from '@src/api/user/user.controller';
import { UserUpdateService } from './service/user.update';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserCreateService, UserReadService, UserUpdateService],
})
export class UserModule {}
