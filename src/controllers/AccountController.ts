import { Request, Response } from 'express';

import { PrismaAccountRepository } from '../infra/repositories/PrismaAccountRepository';

import { CreateAccountUseCase } from '../domain/usecases/CreateAccountUseCase';
import { GetBalanceByIdUseCase } from '../domain/usecases/GetBalanceByIdUseCase';
import { ListAccountsUseCase } from '../domain/usecases/ListAccountsUseCase';

export class AccountController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, password } = request.body;

    const accountRepository = new PrismaAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    try {
      await createAccountUseCase.execute({
        name,
        cpf,
        password
      });

      return response
        .status(201)
        .json({ message: 'Account created successfully' });
    } catch (e) {
      return response.status(500).json({ error: e.message });
    }
  }

  static async getBalance(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { account_id } = request.params;

    const accountRepository = new PrismaAccountRepository();
    const getBalanceById = new GetBalanceByIdUseCase(accountRepository);

    try {
      const balance = await getBalanceById.execute(account_id);

      if (!balance) {
        return response.status(404).json({ message: 'Account not found' });
      }

      return response.json(balance);
    } catch (e) {
      return response.status(500).json({ error: e.message });
    }
  }

  static async list(_request: Request, response: Response): Promise<Response> {
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
