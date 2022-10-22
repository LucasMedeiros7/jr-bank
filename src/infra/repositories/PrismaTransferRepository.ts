import { Transfer } from '../../domain/entities/Transfer';
import { ITransferRepository } from '../../domain/repositories/ITransferRepository';

class PrismaTransferRepository implements ITransferRepository {
  save({
    account_origin_id,
    account_destination_id,
    amount
  }: {
    account_origin_id: string;
    account_destination_id: string;
    amount: number;
  }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listAll(): Promise<Transfer[]> {
    throw new Error('Method not implemented.');
  }
}
