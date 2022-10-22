import { Transfer } from '../../../domain/entities/Transfer';
import { ITransferRepository } from '../../../domain/repositories/ITransferRepository';

export class InMemoryTransferRepository implements ITransferRepository {
  transfers: Transfer[];

  constructor() {
    this.transfers = [];
  }

  async save(transfer: Transfer): Promise<void> {
    this.transfers.push(transfer);
  }

  async listAll(): Promise<Transfer[]> {
    return this.transfers;
  }
}
