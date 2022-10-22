import { Transfer } from '../entities/Transfer';

export interface ITransferRepository {
  save(transfer: Transfer): Promise<void>;
  listAll(): Promise<Transfer[]>;
}
