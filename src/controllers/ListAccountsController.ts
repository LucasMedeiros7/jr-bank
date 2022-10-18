import { Request, Response } from 'express';

import { ListAccountsUseCase } from '../domain/usecases/ListAccountsUseCase';
import { PrismaAccountRepository } from '../infra/repositories/PrismaAccountRepository';

class ListAccountsController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const accountRepository = new PrismaAccountRepository();
    const listAccountsUseCase = new ListAccountsUseCase(accountRepository);

    const accounts = await listAccountsUseCase.execute();

    if (!accounts.length) {
      return response.status(404).json({ message: 'Accounts not found' });
    }

    accounts.forEach((account) => account.password = undefined);

    return response.json(accounts);
  }
}

export const listAccountsController = new ListAccountsController();
