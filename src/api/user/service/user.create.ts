import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createSession } from '@src/api/user/common/session';
import { User } from '@src/api/user/model/user.entity';

@Injectable()
export class UserCreateService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    password: string,
    nickname: string,
  ): Promise<User> {
    const newUser = this.userRepository.create({
      email: email,
      password: password,
      nickname: nickname,
    });
    newUser.session = createSession(email);
    const saved = await this.userRepository.save(newUser);
    saved.password = undefined;
    return saved;
  }
}
