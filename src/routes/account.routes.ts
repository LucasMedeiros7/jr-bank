import { Router } from 'express';
import { PrismaAccountRepository } from '../infra/repositories/PrismaAccountRepository';

import { AccountController } from '../controllers/AccountController';

const accountRoutes = Router();

const accountRepository = new PrismaAccountRepository();
const accountController = new AccountController(accountRepository);

accountRoutes.post('/', (request, response) => {
  accountController.create(request, response);
});
accountRoutes.get('/', (request, response) => {
  accountController.getBalance(request, response);
});
accountRoutes.get('/:account_id/balance', (request, response) => {
  accountController.list(request, response);
});

export { accountRoutes };
