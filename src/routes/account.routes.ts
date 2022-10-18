import { Router } from 'express';

import { listAccountsController } from '../controllers/ListAccountsController';
import { getBalanceByIdController } from '../controllers/GetBalanceByIdController';
import { createAccountController } from '../controllers/CreateAccountController';

const accountRoutes = Router();

accountRoutes.post('/', createAccountController.handle);
accountRoutes.get('/', listAccountsController.handle);
accountRoutes.get('/:account_id/balance', getBalanceByIdController.handle);

export { accountRoutes };
