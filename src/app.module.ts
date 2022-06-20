import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { DocumentModule } from '@src/api/document/document.module';
import { LoggerMiddleware } from '@src/common/nest/middlewares/logger.middleware';
import { MysqlModule } from '@src/common/database/mysql/mysql.module';
import { UserModule } from '@src/api/user/user.module';
import { RedisModule } from '@src/common/database/redis/redis.module';

@Module({
  imports: [MysqlModule, DocumentModule, UserModule, RedisModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
