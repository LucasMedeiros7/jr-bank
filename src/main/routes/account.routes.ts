import { Router } from 'express';

import {
  makeListAccountsController,
  makeCreateAccountController,
  makeGetBalanceByIdController
} from '../factories/accountControllersFactories';

const accountRoutes = Router();

accountRoutes.post('/', (req, res) => {
  makeCreateAccountController().handle(req, res);
});

accountRoutes.get('/', async (req, res) => {
  makeListAccountsController().handle(req, res);
});

accountRoutes.get('/:account_id/balance', async (req, res) => {
  makeGetBalanceByIdController().handle(req, res);
});

export { accountRoutes };
