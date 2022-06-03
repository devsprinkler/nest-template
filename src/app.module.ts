import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { DocumentModule } from '@src/api/document/document.module';
import { LoggerMiddleware } from '@src/common/nest/middlewares/logger.middleware';

@Module({
  imports: [DocumentModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
