import {HomeController} from './controller/home'
import {ChoreController} from './controller/chore'
import {DebtController} from './controller/debt'
import { Express } from 'express-serve-static-core';

export const registerRoutes = (api: Express): void => {
  
    // api routes
    api.get('/', HomeController.index);

    /* chores */
    api.get('/api/chores', ChoreController.getAllChores);
    api.patch('/api/chores/:choreId', ChoreController.updateChore);
    api.post('/api/chores/changeChors', ChoreController.changeChors)


     /* debts */
     api.get('/api/debts', DebtController.getAllDebts);
     api.post('/api/debts', DebtController.createDebt);
     api.delete('/api/debts/:debtId', DebtController.deleteDebt)

    
}