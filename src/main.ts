import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { LoggingService } from '@src/common/util/logger/logging.service';
import { logger } from '@src/common/util/logger/winston-logger';
import { GlobalExceptionsFilter } from '@src/common/nest/filters/global-exception-filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggingService(),
  });
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.use(helmet());
  await app.listen(3000, '0.0.0.0', () => {
    logger.info('Server listen on port 3000');
  });
}
bootstrap();
