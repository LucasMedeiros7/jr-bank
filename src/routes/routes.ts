import { Router } from 'express';
import { PrismaAccountRepository } from '../repositories/implementations/PrismaAccountRepository';
import { CreateAccountUseCase } from '../usecases/CreateAccountUseCase';
import { ListAccountUseCase } from '../usecases/ListAccountUseCase';

const accountRoutes = Router();

const accountRepository = new PrismaAccountRepository();

accountRoutes.post('/accounts', async (request, response) => {
  const { name, cpf, password } = request.body;

  const createAccountUseCase = new CreateAccountUseCase(accountRepository);

  await createAccountUseCase.execute({ name, cpf, password });

  return response.sendStatus(201);
});

accountRoutes.get('/accounts', async (request, response) => {
  const listAccountsUseCase = new ListAccountUseCase(accountRepository);
  const accounts = await listAccountsUseCase.execute();

  return response.json(accounts);
});

export { accountRoutes };
