import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Logger, format } from 'winston';

const { combine, timestamp, prettyPrint, colorize, errors, json, ms, printf } =
  format;
let logger: Logger;

const myFormat = printf(({ message, timestamp, ms, level }) => {
  return `${timestamp} ${level} ${message} ${ms}`;
});

const createLogger = () => {
  if (logger) {
    logger.error('Logger instance already edefined. So ignore it.');
    return;
  }

  logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
    format: combine(
      errors({ stack: true }),
      timestamp({ format: 'YYYY. MM. DD. HH:mm:SS' }),
      json(),
      ms(),
      colorize(),
      ...(process.env.NODE_ENV !== 'production' ? [prettyPrint()] : []),
      myFormat,
    ),
    // 로그에 메타데이터 설정 가능.
    // defaultMeta: { service: "maybe-renewal" },
    transports: [],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(colorize()),
      }),
    );
  }

  if (process.env.NODE_ENV === 'production') {
    logger.add(
      new winston.transports.DailyRotateFile({
        level: 'error',
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YY-MM-DD',
        zippedArchive: true,
        maxSize: '1k',
        maxFiles: '14d',
      }),
    );

    logger.add(
      new winston.transports.DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YY-MM-DD',
        zippedArchive: true,
        maxSize: '1k',
        maxFiles: '14d',
      }),
    );
  }
};

export { logger, createLogger };
