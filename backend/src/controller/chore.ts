import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';
import { Chore } from '../models/chore';
import { DebtController } from './debt';

export class ChoreController {
  private static chores: Chore[] = [{
    choreDoer: "Lars",
    choreName: "Bad",
    id: "0",
    done: false,
    choreTasks: ["Lavabo WC", "WC", "Spiegel WC", "Lavabo Dusche", "Spiegel Dusche", "Dusche"]
  }, 
  {
    choreDoer: "Mary",
    choreName: "Küche",
    id: "1",
    done: false,
    choreTasks: ["Herd", "Becken", "Hahnen", "Oberflächen", "Mikrowelle (falls nötig)", "Kaffeemaschine (falls nötig)"]
  },
  {
    choreDoer: "TBD",
    choreName: "Boden",
    id: "2",
    done: false,
    choreTasks: ["Staubsaugern", "Aufnehmen"]
  }]

  public static getAllChores(req: Request, res: Response): void {
    logger.info('GET Request on /api/chores');
    res.json(ChoreController.chores);
  }

  public static updateChore(req: Request, res: Response, next: NextFunction): void {
    logger.info('PATCH Request on /api/chores');

    if(!req.params.choreId) {
      res.status(400);
      next(new Error('Missing uuid for deleting deck!'));
      return;
    }

    const updatedChore = ChoreController.chores.find((chore) => {
      return chore.id === req.params.choreId;
    })

    const idx = ChoreController.chores.findIndex((chore) => {
      return chore.id === req.params.choreId;
    })

    const newChore: Chore = {
      ...updatedChore,
      done: !updatedChore.done
    }

    ChoreController.chores.splice(idx, 1, newChore)
    res.json(ChoreController.chores);
  }
  
  public static changeChors(req: Request, res: Response): void {
    logger.info('POST Request on /api/chores/changeChores');

    // change chore names
    const choreDoerLast = ChoreController.chores[2].choreDoer;
    ChoreController.chores[2].choreDoer = ChoreController.chores[1].choreDoer;
    ChoreController.chores[1].choreDoer = ChoreController.chores[0].choreDoer;
    ChoreController.chores[0].choreDoer = choreDoerLast;

    // create debts from not done chores
    const choresNotDone = ChoreController.chores.filter((chore) => {
      return chore.done === false
    })

    choresNotDone.forEach((chore) => {
      DebtController.createDebtBackend("Ämtli nicht gemacht!", "Lars", chore.choreDoer, 5);
    })

    // reset all finished chores
    ChoreController.chores.forEach((chore) => {
      chore.done = false;
    })
    res.json(ChoreController.chores);
  }
}