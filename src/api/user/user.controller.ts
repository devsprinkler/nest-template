import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequestBody } from '@src/api/user/dto/create-user.dto';
import { User } from '@src/api/user/model/user.entity';
import { UserCreateService } from '@src/api/user/service/user.create';

@Controller('/user')
export class UserController {
  constructor(private readonly userCreateService: UserCreateService) {}

  @Post()
  async createUser(@Body() body: CreateUserRequestBody): Promise<User> {
    return this.userCreateService.createUser(
      body.email,
      body.password,
      body.nickname,
    );
  }
}
