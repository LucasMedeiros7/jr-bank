import { Router } from 'express';

import { PrismaAccountRepository } from '../../infra/repositories/PrismaAccountRepository';
import { makeCreateAccountController } from '../factories/createAccountControllerFactory';

import { ListAccountUseCase } from '../../domain/account/usecases/ListAccountUseCase';

const accountRoutes = Router();

const accountRepository = new PrismaAccountRepository();

accountRoutes.post('/', (request, response) =>
  makeCreateAccountController().handle(request, response),
);

accountRoutes.get('/', async (request, response) => {
  const listAccountsUseCase = new ListAccountUseCase(accountRepository);
  const accounts = await listAccountsUseCase.execute();

  return response.json(accounts);
});

export { accountRoutes };
