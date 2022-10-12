import { Request, Response } from 'express';
import { GetBalanceByIdUseCase } from './GetBalanceByIdUseCase';

export class GetBalanceByIdController {
  constructor(private getBalanceById: GetBalanceByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.params;

    const balance = await this.getBalanceById.execute(account_id);

    return response.json(balance);
  }
}
