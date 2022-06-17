import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserRequestBody } from '@src/api/user/dto/create-user.dto';
import { User } from '@src/api/user/model/user.entity';
import { UserCreateService } from '@src/api/user/service/user.create';
import { GetUserInfoQuery } from './dto/get-user-info.dto';
import { UserReadService } from './service/user.read';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userCreateService: UserCreateService,
    private readonly userReadService: UserReadService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserRequestBody): Promise<User> {
    return this.userCreateService.createUser(
      body.email,
      body.password,
      body.nickname,
    );
  }

  @Get()
  async getUserInfo(@Query() query: GetUserInfoQuery): Promise<User> {
    return this.userReadService.getUserInfo(query.uid);
  }
}
