import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';
import Debt, { IDebt } from '../models/debt';

export class DebtController {

  public static async createDebt(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    const {reason, to, from, amount} = req.body;

    const newDebt: IDebt = new Debt ({
        reason,
        to,
        from,
        amount,
        date: new Date(),
        payed: false
    })

    newDebt.save((err, debt) => {
      if(err) {
        next(new Error('Error while inserting into DB!'));
      }
      logger.info(`Debt from ${debt.from} to ${debt.to} with reason: ${debt.reason} saved in DB.`)
    });
    res.json(newDebt);
  }

  public static async getAllDebtsNotPayed(req: Request, res: Response): Promise<void> {
    logger.info('GET Request on /api/debts');
    res.json(await Debt.find({payed: false}).sort('date'));
  }

  public static async getDebtsPayed(req: Request, res: Response): Promise<void> {
    logger.info('GET REQUEST on /api/debts/payed');
    res.json(await Debt.find({payed: true}).sort('-date'))
  }

  public static async patchDebt(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info('PATCH Request on /api/debts');

    if(!req.params.debtId) {
        res.status(400);
        next(new Error('Missing id for deleting deck!'));
        return;
    }

    await Debt.findByIdAndUpdate(req.params.debtId, { $set: { payed: true }});

    res.json(await Debt.find({payed: false}).sort('date'));
  }


  public static createDebtBackend(reason: string, to: string, from: string, amount: number): void {
    const newDebt: IDebt = new Debt ({
      reason,
      to,
      from,
      amount,
      payed: false,
      date: new Date()
    });

    newDebt.save( (err, debt) => {
      logger.info(`Debt from ${debt.from} to ${debt.to} with reason: ${debt.reason} saved in DB.`)
    });
  }

  public static async getPayedMostByChores(req: Request, res: Response): Promise<void> {
    const result = await Debt.aggregate([
        { 
          $match: { payed : true } 
        },
        {
          $group: {
            _id: "$from",
            totalPayedByChors: { $sum: "$amount"}
          }
        }
    ]);
    res.json(result);
  }
}