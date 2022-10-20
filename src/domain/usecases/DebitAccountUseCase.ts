import { IAccountRepository } from '../repositories/IAccountRepository';

export class DebitAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(account_id: string, amount: number): Promise<void> {
    const account = await this.accountRepository.listById(account_id);

    if (!account) {
      throw new Error('Invalid account detination id');
    }

    if (amount > account.balance) {
      throw new Error('Insufficient funds');
    }

    // nao aceitar float de alguma forma para nao atrapalhar a conta
    const newBalance = account.balance - amount;

    await this.accountRepository.updateBalance(account_id, newBalance);
  }
}
