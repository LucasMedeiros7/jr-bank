import { IAccountRepository } from '../repositories/IAccountRepository';
import { ITransferRepository } from '../repositories/ITransferRepository';
import { TransactionUseCase } from './TransactionUseCase';

type input = {
  account_origin_id: string;
  account_destination_id: string;
  amount: number;
};

export class CreateTransferUseCase {
  constructor(
    private transferRepository: ITransferRepository,
    private accountRepository: IAccountRepository
  ) {}

  async execute({
    account_origin_id,
    account_destination_id,
    amount
  }: input): Promise<void> {
    const transactionUseCase = new TransactionUseCase(this.accountRepository);

    try {
      await transactionUseCase.execute({
        account_origin_id,
        account_destination_id,
        amount
      });
    } catch (err) {
      throw new Error(err.message);
    }

    await this.transferRepository
      .save({
        account_origin_id,
        account_destination_id,
        amount
      })
      .catch((err) => console.log(err));
  }
}
