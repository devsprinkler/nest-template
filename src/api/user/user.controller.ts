import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { CreateUserRequestBody } from '@src/api/user/dto/create-user.dto';
import { User } from '@src/api/user/model/user.entity';
import { UserCreateService } from '@src/api/user/service/user.create';
import { GetUserInfoQuery } from './dto/get-user-info.dto';
import { LoginRequestBody } from './dto/login.dto';
import { UserReadService } from './service/user.read';
import { UserUpdateService } from './service/user.update';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userCreateService: UserCreateService,
    private readonly userReadService: UserReadService,
    private readonly userUpdateService: UserUpdateService,
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

  @Put()
  async login(@Body() body: LoginRequestBody): Promise<User> {
    return this.userUpdateService.login(body.email, body.password);
  }
}
