import { ForbiddenException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class AuthMidlleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers['role']);

    if (
      req.method !== 'GET' &&
      (!req.headers['role'] || req.headers['role'] !== 'Admin')
    )
      throw new ForbiddenException();
    next();
  }
}
