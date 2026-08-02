import { BadGatewayException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class blockBrowser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers['user-agent']);
    if (req.headers['user-agent']?.includes('Mozilla'))
      throw new BadGatewayException();
    next();
  }
}
