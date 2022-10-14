import { Request, Response } from 'express';

import { ListAccountsUseCase } from '../domain/usecases/ListAccountsUseCase';
import { PrismaAccountRepository } from '../infra/repositories/PrismaAccountRepository';

class ListAccountsController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const accountRepository = new PrismaAccountRepository();
    const listAccountsUseCase = new ListAccountsUseCase(accountRepository);

    const accounts = await listAccountsUseCase.execute();
    return response.json(accounts);
  }
}

export default new ListAccountsController();
