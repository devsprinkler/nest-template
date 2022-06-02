import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import helmet from 'helmet';
import { LoggingService } from '@src/common/util/logger/logging.service';
import { logger } from '@src/common/util/logger/winston-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggingService(),
  });
  app.use(helmet());
  await app.listen(3000, '0.0.0.0', () => {
    logger.info('Server listen on port 3000');
  });
}
bootstrap();
