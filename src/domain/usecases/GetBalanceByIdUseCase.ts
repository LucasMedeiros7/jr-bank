import { IAccountRepository } from '../repositories/IAccountRepository';

type output = {
  account_id: string;
  balance: number;
};

export class GetBalanceByIdUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(accountId: string): Promise<output> {
    const account = await this.accountRepository.listById(accountId);

    if (!account) {
      throw new Error('Invalid ID');
    }

    return {
      account_id: account.account_id,
      balance: account.balance
    };
  }
}
