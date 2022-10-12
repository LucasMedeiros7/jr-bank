import { Request, Response } from 'express';
import { GetBalanceByIdUseCase } from '../domain/usecases/GetBalanceByIdUseCase';
import { PrismaAccountRepository } from '../infra/repositories/PrismaAccountRepository';

class GetBalanceByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.params;

    const accountRepository = new PrismaAccountRepository();
    const getBalanceById = new GetBalanceByIdUseCase(accountRepository);

    const balance = await getBalanceById.execute(account_id);

    return response.json(balance);
  }
}

export default new GetBalanceByIdController();
