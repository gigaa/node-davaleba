import { Response, Request, NextFunction } from 'express';

export function LogMidlleware(req: Request, res: Response, next: NextFunction) {
  console.log(`Log Request Method: ${req.method} | url:  ${req.originalUrl} `);
  next();
}
