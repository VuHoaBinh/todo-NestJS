import { LoggerService } from './logger.service';

export class loggerModule {
  static forRoot() {
    return {
      module: loggerModule,
      providers: [LoggerService],
      exports: [LoggerService],
    };
  }
}
