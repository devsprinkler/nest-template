import { CacheModule, Module } from '@nestjs/common';
import redisStore from 'cache-manager-ioredis';
import { RedisService } from '@src/common/database/redis/redis.service';

const redisHost = process.env.MYSQL_HOST || '127.0.0.1';
const redisPort = parseInt(process.env.MYSQL_PORT) || 6379;

const cacheModule = CacheModule.registerAsync({
  useFactory: () => ({
    store: redisStore,
    host: redisHost,
    port: redisPort,
    ttl: 0,
  }),
});

@Module({
  imports: [cacheModule],
  providers: [RedisService],
  exports: [cacheModule, RedisService],
})
export class RedisModule {}
