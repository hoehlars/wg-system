import { Request, Response } from 'express';
import { logger } from '../logger';

export class HomeController {
  public static index(req: Request, res: Response): void {
    res.json({ message: 'Backend of WG-System reporting for duty' });
    logger.info('GET Request on /');
  }
}