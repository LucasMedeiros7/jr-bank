import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';
import { PrismaAccountRepository } from '../infra/repositories/PrismaAccountRepository';

const loginRoutes = Router();
const accountRepository = new PrismaAccountRepository();
const accountController = new LoginController(accountRepository);

loginRoutes.post('/', (request, response) => {
  accountController.perfom(request, response);
});

export { loginRoutes };
