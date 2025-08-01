import { Request, Response, NextFunction } from 'express';
import { LoggingMiddleware } from '../middlewares/logging.middlewares';

describe('LoggerMiddleware', () => {
  let middleware: LoggingMiddleware;

  beforeEach(() => {
    middleware = new LoggingMiddleware();
  });

  it('should log and call next', () => {
    const req = {
      method: 'GET',
      originalUrl: '/users',
    } as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
