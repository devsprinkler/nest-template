import { Injectable } from '@nestjs/common';
import { RedisService } from '@src/common/database/redis/redis.service';
import { NestError } from '@src/common/nest/exception/nest-error';
import { logger } from '@src/common/util/logger/winston-logger';
import crypto from 'crypto';

@Injectable()
export class UserSessionService {
  constructor(private readonly redisService: RedisService) {}

  async createSession(key: string): Promise<string> {
    const session = crypto
      .createHmac('sha256', key)
      .update(crypto.randomBytes(8))
      .digest('hex');
    const succeeded = await this.redisService.hmset(`session:${session}`, {
      email: key,
    });
    if (succeeded !== 'OK') {
      throw new NestError(500, 'redis failed');
    }
    return session;
  }

  async withdrawSession(session: string): Promise<boolean> {
    try {
      await this.redisService.del(`session:${session}`);
      return true;
    } catch (e) {
      logger.error(e);
      throw new NestError(500, 'redis delete failed');
    }
  }
}
