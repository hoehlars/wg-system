import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';
import {v4 as uuidv4} from 'uuid';
import { Debt } from '../models/debt';

export class DebtController {
    private static debts: Debt[] = [];
    private static debtsDone: Debt[] = [];

  public static createDebt(req: Request, res: Response, next: NextFunction): void {
    logger.info('POST Request on /api/debts');

    if (!req.body.reason) {
        res.status(400);
        next(new Error('Missing reason for debt!'));
        return;
    }

    if(!req.body.to) {
        res.status(400);
        next(new Error('Missing to for debt!'));
        return;
    }

    if(!req.body.from) {
        res.status(400);
        next(new Error('Missing from for debt!'));
        return;
    }

    if(!req.body.amount) {
        res.status(400);
        next(new Error('Missing amount for debt!'));
        return;
    }


    const uuid: string = uuidv4();
    const date = new Date();
    const formattedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`

    const {reason, to, from, amount} = req.body;
    const newDebt: Debt = {
        reason,
        to,
        from,
        amount,
        id: uuid,
        date: formattedDate
    }

    DebtController.debts = [newDebt].concat(DebtController.debts)
    res.json(newDebt);
  }

  public static getAllDebts(req: Request, res: Response): void {
    logger.info('GET Request on /api/debts');
    res.json(DebtController.debts);
  }

  public static getDebtsDone(req: Request, res: Response): void {
    logger.info('GET REQUEST on /api/debts/done');
    res.json(DebtController.debtsDone)
  }

  public static deleteDebt(req: Request, res: Response, next: NextFunction): void {
    logger.info('DELETE Request on /api/debts');

    if(!req.params.debtId) {
        res.status(400);
        next(new Error('Missing uuid for deleting deck!'));
        return;
    }

    const idx = DebtController.debts.findIndex((debt) => {
        return debt.id === req.body.uuid;
    })

  
    const debtDone: Debt[] = DebtController.debts.splice(idx,1);
    // add debt to debtsdone
    DebtController.debtsDone = [...debtDone, ...DebtController.debtsDone]

    res.json(DebtController.debts);
  }


  public static createDebtBackend(reason: string, to: string, from: string, amount: number): void {
    const uuid: string = uuidv4();
    const date = new Date();
    const formattedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    const newDebt: Debt = {
      reason,
      to,
      from,
      amount,
      id: uuid,
      date: formattedDate
  }
    DebtController.debts = [newDebt].concat(DebtController.debts)
    console.log(DebtController.debts)
  }
}