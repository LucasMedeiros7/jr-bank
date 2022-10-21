import { IAccountRepository } from '../repositories/IAccountRepository';

type input = {
  account_origin_id: string;
  account_destination_id: string;
  amount: number;
};

export class TransactionUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({
    account_origin_id,
    account_destination_id,
    amount
  }: input): Promise<void> {
    const destinationAccount = await this.accountRepository.listById(
      account_destination_id
    );

    if (!destinationAccount) {
      throw new Error('Invalid account destination id');
    }

    await this.debitAccount(account_origin_id, amount);
    await this.creditAccount(destinationAccount.account_id, amount);
  }

  private async creditAccount(account_id: string, amount: number) {
    const account = await this.accountRepository.listById(account_id);
    const newBalance = account.balance + amount;
    await this.accountRepository.updateBalance(account_id, newBalance);
  }

  private async debitAccount(account_id: string, amount: number) {
    const account = await this.accountRepository.listById(account_id);

    if (amount > account.balance) {
      throw new Error('Insufficient funds');
    }

    const newBalance = account.balance - amount;
    await this.accountRepository.updateBalance(account_id, newBalance);
  }
}
