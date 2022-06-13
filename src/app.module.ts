import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { DocumentModule } from '@src/api/document/document.module';
import { LoggerMiddleware } from '@src/common/nest/middlewares/logger.middleware';
import { MysqlModule } from '@src/common/database/mysql/mysql.module';

@Module({
  imports: [MysqlModule, DocumentModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
