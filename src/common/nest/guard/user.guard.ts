import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSessionService } from '@src/api/user/common/session';
import { User } from '@src/api/user/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userSessionService: UserSessionService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const session = request.headers['authorization']?.split(' ')[1];
    if (session == null) {
      return false;
    }
    const email = await this.userSessionService.checkSession(session);
    const user = await this.userRepository.findOne({
      where: { email: email, deleted: false },
    });
    return user ? true : false;
  }
}
