import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserRequestBody } from '@src/api/user/dto/create-user.dto';
import { User } from '@src/api/user/model/user.entity';
import { UserCreateService } from '@src/api/user/service/user.create';
import { GetUserInfoQuery } from '@src/api/user/dto/get-user-info.dto';
import { LoginRequestBody } from '@src/api/user/dto/login.dto';
import { WithdrawUserRequestBody } from '@src/api/user/dto/withdraw-user.dto';
import { UserReadService } from '@src/api/user/service/user.read';
import { UserUpdateService } from '@src/api/user/service/user.update';
import { UserGuard } from '@src/common/nest/guard/user.guard';

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

  @UseGuards(UserGuard)
  @Put('/withdraw')
  async withdrawUser(@Body() body: WithdrawUserRequestBody): Promise<boolean> {
    return this.userUpdateService.withdrawUser(body.email, body.password);
  }
}
