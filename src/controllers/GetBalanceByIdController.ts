import { Request, Response } from 'express';

import { GetBalanceByIdUseCase } from '../domain/usecases/GetBalanceByIdUseCase';
import { PrismaAccountRepository } from '../infra/repositories/PrismaAccountRepository';

class GetBalanceByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
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
}

export const getBalanceByIdController = new GetBalanceByIdController();
