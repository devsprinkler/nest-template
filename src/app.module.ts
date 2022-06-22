import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { DocumentModule } from '@src/api/document/document.module';
import { LoggerMiddleware } from '@src/common/nest/middlewares/logger.middleware';
import { UserModule } from '@src/api/user/user.module';
import { DatabaseModule } from '@src/common/database/database.module';
import { CommentModule } from '@src/api/comment/comment.module';

@Module({
  imports: [DatabaseModule, DocumentModule, UserModule, CommentModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
