import { LoggerService } from '@nestjs/common';
import { createLogger, logger } from '@src/common/util/logger/winston-logger';

export class LoggingService implements LoggerService {
  constructor() {
    createLogger();
  }
  log(message: string, context?: string) {
    logger.info(`[${context}] ${message}`);
  }
  error(message: string, trace: string, context?: string) {
    logger.error(message, { stack: trace, context });
  }
  warn(message: string, context?: string) {
    logger.warn(message, context);
  }
  debug(message: string, context?: string) {
    logger.debug(message, context);
  }
  verbose(message: string, context?: string) {
    logger.verbose(message, context);
  }
}
