import { Transfer } from '../../domain/entities/Transfer';
import { ITransferRepository } from '../../domain/repositories/ITransferRepository';

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
      transferId: 'faketransfer123456',
      account_origin_id,
      account_destination_id,
      amount,
      created_at: new Date()
    };

    this.transfers.push(transfer);
  }

  async listAll(): Promise<Transfer[]> {
    return this.transfers;
  }
}
