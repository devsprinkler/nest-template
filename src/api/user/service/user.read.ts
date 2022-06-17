import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NestError } from '@src/common/nest/exception/nest-error';
import { User } from '@src/api/user/model/user.entity';

@Injectable()
export class UserReadService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserInfo(uid: number): Promise<User> {
    const user = this.userRepository.findOne({
      where: { uid: uid, deleted: false },
      select: {
        uid: true,
        email: true,
        nickname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (user == null) {
      throw new NestError(500, 'user notfound');
    }
    return user;
  }
}
