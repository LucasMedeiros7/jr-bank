import { Transfer } from '../entities/Transfer';

type input = {
  account_origin_id: string;
  account_destination_id: string;
  amount: number;
};

export interface ITransferRepository {
  save({
    account_origin_id,
    account_destination_id,
    amount
  }: input): Promise<void>;

  listAll(): Promise<Transfer[]>;
}
