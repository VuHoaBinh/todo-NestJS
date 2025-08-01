import { Injectable } from '@nestjs/common';
import { Logger, createLogger, transports, format } from 'winston';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor(private readonly configService: ConfigService) {
    const logDir = 'logs';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const loggerConfig = this.configService.get('logging');

    this.logger = createLogger({
      level: loggerConfig?.level || 'info',
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        format.printf(({ level, message, timestamp, ...meta }) => {
          return JSON.stringify({
            timestamp,
            level: level.toUpperCase(),
            message,
            ...meta,
          });
        }),
      ),
      transports: [
        new transports.Console({ level: 'debug' }),
        new transports.File({
          filename: path.join(logDir, 'application.log'),
          level: 'debug',
        }),
      ],
    });

    this.logger.on('error', (err) => {
      console.error('Logger encountered an error:', err);
    });

    this.logger.info('LoggerService initialized');
  }

  setContext(context: string) {
    this.logger.defaultMeta = { context };
  }

  error(message: string, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  info(message: string, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  debug(message: string, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }
}
