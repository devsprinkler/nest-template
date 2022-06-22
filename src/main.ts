import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { LoggingService } from '@src/common/util/logger/logging.service';
import { logger } from '@src/common/util/logger/winston-logger';
import { GlobalExceptionsFilter } from '@src/common/nest/filters/global-exception-filter';
import { GlobalResponseInterceptor } from '@src/common/nest/interceptor/global-response-interceptor';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggingService(),
  });
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(helmet());
  await app.listen(port, '0.0.0.0', () => {
    // 0.0.0.0 means, Server use IPv4 only
    logger.info(`Server listen on port ${port}`);
  });
}
bootstrap();
