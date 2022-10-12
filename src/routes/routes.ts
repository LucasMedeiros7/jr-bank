import { response, Router } from 'express';
import { request } from 'http';
import makeCreateAccountController from '../factories/createAccountControllerFactory';
import { PrismaAccountRepository } from '../repositories/implementations/PrismaAccountRepository';
import { CreateAccountUseCase } from '../usecases/CreateAccountUseCase';
import { ListAccountUseCase } from '../usecases/ListAccountUseCase';

const accountRoutes = Router();

const accountRepository = new PrismaAccountRepository();

accountRoutes.post('/accounts', (request, response) =>
  makeCreateAccountController().handle(request, response),
);

accountRoutes.get('/accounts', async (request, response) => {
  const listAccountsUseCase = new ListAccountUseCase(accountRepository);
  const accounts = await listAccountsUseCase.execute();

  return response.json(accounts);
});

export { accountRoutes };
