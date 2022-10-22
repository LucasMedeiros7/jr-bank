import { Request, Response } from 'express';

import { IAccountRepository } from '../domain/repositories/IAccountRepository';
import { ITransferRepository } from '../domain/repositories/ITransferRepository';
import { CreateTransferUseCase } from '../domain/usecases/CreateTransferUseCase';
import { ListTransfersUseCase } from '../domain/usecases/ListTransfersUseCase';

export class TransfersController {
  constructor(
    private accountRepository: IAccountRepository,
    private transferRepository: ITransferRepository
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { account_origin_id } = request;
    const { account_destination_id, amount } = request.body;

    const createTransferUseCase = new CreateTransferUseCase(
      this.transferRepository,
      this.accountRepository
    );

    try {
      const transfer = await createTransferUseCase.execute({
        account_origin_id,
        account_destination_id,
        amount
      });

      return response.status(201).json(transfer);
    } catch (e) {
      return response.status(409).json({ error: e.message });
    }
  }

  async list(_request: Request, response: Response): Promise<Response> {
    const listAccountsUseCase = new ListTransfersUseCase(
      this.transferRepository
    );

    const transfers = await listAccountsUseCase.execute();

    if (!transfers.length) {
      return response.status(404).json({ message: 'Transfers not found' });
    }

    return response.json(transfers);
  }
}
