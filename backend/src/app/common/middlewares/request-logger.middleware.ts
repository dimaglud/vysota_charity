import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl: path, query, originalUrl, body, headers } = request;

    response.on('close', () => {
      const { statusCode } = response;
      Logger.debug({ method, path, query, originalUrl, body, headers, statusCode, ip }, 'HTTP');
    });

    next();
  }
}
