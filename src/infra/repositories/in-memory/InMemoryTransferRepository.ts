import { v4 as uuidv4 } from 'uuid';

import { Transfer } from '../../../domain/entities/Transfer';
import { ITransferRepository } from '../../../domain/repositories/ITransferRepository';

type input = {
  account_origin_id: string;
  account_destination_id: string;
  amount: number;
};

export class InMemoryTransferRepository implements ITransferRepository {
  transfers: Transfer[];

  constructor() {
    this.transfers = [];
  }

  async save({
    account_origin_id,
    account_destination_id,
    amount
  }: input): Promise<void> {
    const transfer = {
      amount,
      account_origin_id,
      account_destination_id,
      transferId: uuidv4(),
      created_at: new Date()
    };

    this.transfers.push(transfer);
  }

  async listAll(): Promise<Transfer[]> {
    return this.transfers;
  }
}
