import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@src/api/user/model/user.entity';
import { UserSessionService } from '../common/session';

@Injectable()
export class UserCreateService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userSessionService: UserSessionService,
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
    newUser.session = await this.userSessionService.createSession(email);
    const saved = await this.userRepository.save(newUser);
    saved.password = undefined;
    return saved;
  }
}
