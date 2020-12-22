import Express, { NextFunction } from 'express';

import { logger } from './logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Express.Request, res: Express.Response, next: NextFunction): void {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.error(`${clientIp} ${req.originalUrl}: ${err.message}`);
  res.json({ error: err.message });
}