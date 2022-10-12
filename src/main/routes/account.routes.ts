import { Router } from 'express';

import {
  makeListAccountsController,
  makeCreateAccountController,
} from '../factories/accountControllersFactories';

const accountRoutes = Router();

accountRoutes.post('/', (request, response) =>
  makeCreateAccountController().handle(request, response),
);

accountRoutes.get('/', async (request, response) => {
  makeListAccountsController().handle(request, response);
});

export { accountRoutes };
