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

    await transactionUseCase.execute({
      account_origin_id,
      account_destination_id,
      amount
    });

    await this.transferRepository.save({
      account_origin_id,
      account_destination_id,
      amount
    });
  }
}
