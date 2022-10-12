import { Router } from 'express';

import createAccountController from '../controllers/CreateAccountController';
import listAccountsController from '../controllers/ListAccountsController';
import getBalanceByIdController from '../controllers/GetBalanceByIdController';

const accountRoutes = Router();

accountRoutes.post('/', createAccountController.handle);
accountRoutes.get('/', listAccountsController.handle);
accountRoutes.get('/:account_id/balance', getBalanceByIdController.handle);

export { accountRoutes };
