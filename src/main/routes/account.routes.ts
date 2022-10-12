import { Router } from 'express';

import {
  makeListAccountsController,
  makeCreateAccountController,
  makeGetBalanceByIdController,
} from '../factories/accountControllersFactories';

const accountRoutes = Router();

accountRoutes.post('/', (request, response) =>
  makeCreateAccountController().handle(request, response),
);

accountRoutes.get('/', async (request, response) => {
  makeListAccountsController().handle(request, response);
});

accountRoutes.get('/:account_id/balance', async (request, response) => {
  makeGetBalanceByIdController().handle(request, response);
});

export { accountRoutes };
