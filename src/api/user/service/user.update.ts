import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import crypto from 'crypto';
import { User, USER_HASH_KEY } from '@src/api/user/model/user.entity';
import { NestError } from '@src/common/nest/exception/nest-error';
import { createSession } from '../common/session';

@Injectable()
export class UserUpdateService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private isPasswordCorrect(password: string, hashed: string): boolean {
    const h = crypto
      .createHmac('sha256', USER_HASH_KEY)
      .update(password)
      .digest('hex');

    return h === hashed;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email, deleted: false },
      select: {
        uid: true,
        email: true,
        password: true,
        createdAt: true,
      },
    });
    if (!this.isPasswordCorrect(password, user.password)) {
      throw new NestError(500, 'password incorrect');
    }
    user.session = createSession(email);
    const saved = await this.userRepository.save(user);
    saved.password = undefined;
    return saved;
  }

  async withdrawUser(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email, deleted: false },
      select: {
        uid: true,
        email: true,
        password: true,
      },
    });
    if (!this.isPasswordCorrect(password, user.password)) {
      throw new NestError(500, 'password incorrect');
    }

    user.deleted = true;
    await this.userRepository.save(user);
    return true;
  }
}
