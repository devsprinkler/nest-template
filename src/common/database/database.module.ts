import { Global, Module } from '@nestjs/common';
import { MysqlModule } from '@src/common/database/mysql/mysql.module';
import { RedisModule } from '@src/common/database/redis/redis.module';

@Global()
@Module({
  imports: [MysqlModule, RedisModule],
  exports: [MysqlModule, RedisModule],
})
export class DatabaseModule {}
