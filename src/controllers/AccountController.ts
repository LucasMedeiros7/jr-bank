import { Request, Response } from 'express';

import { IAccountRepository } from '../domain/repositories/IAccountRepository';

import { CreateAccountUseCase } from '../domain/usecases/CreateAccountUseCase';
import { GetBalanceByIdUseCase } from '../domain/usecases/GetBalanceByIdUseCase';
import { ListAccountsUseCase } from '../domain/usecases/ListAccountsUseCase';

export class AccountController {
  constructor(private accountRepository: IAccountRepository) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, password } = request.body;

    const createAccountUseCase = new CreateAccountUseCase(
      this.accountRepository
    );

    try {
      const account = await createAccountUseCase.execute({
        name,
        cpf,
        password
      });

      account.password = undefined;
      return response.status(201).json(account);
    } catch (e) {
      return response.status(409).json({ error: e.message });
    }
  }

  async getBalance(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.params;

    const getBalanceById = new GetBalanceByIdUseCase(this.accountRepository);

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

  async list(_request: Request, response: Response): Promise<Response> {
    const listAccountsUseCase = new ListAccountsUseCase(this.accountRepository);

    const accounts = await listAccountsUseCase.execute();

    if (!accounts.length) {
      return response.status(404).json({ message: 'Accounts not found' });
    }

    accounts.forEach((account) => account.password = undefined);

    return response.json(accounts);
  }
}
