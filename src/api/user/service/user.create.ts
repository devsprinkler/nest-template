import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
import crypto from 'crypto';

@Injectable()
export class UserCreateService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private createSession(key: string): string {
    const session = crypto
      .createHmac('sha256', key)
      .update(crypto.randomBytes(8))
      .digest('hex');
    // TODO: save the session to cache
    return session;
  }

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
    newUser.session = this.createSession(email);
    const saved = await this.userRepository.save(newUser);
    saved.password = undefined;
    return saved;
  }
}
