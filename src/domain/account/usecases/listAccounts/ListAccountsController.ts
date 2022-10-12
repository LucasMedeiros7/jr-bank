import { Request, Response } from 'express';
import { ListAccountsUseCase } from './ListAccountsUseCase';

export class ListAccountsController {
  constructor(private listAccountsUseCase: ListAccountsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const accounts = await this.listAccountsUseCase.execute();
    return response.json(accounts);
  }
}
