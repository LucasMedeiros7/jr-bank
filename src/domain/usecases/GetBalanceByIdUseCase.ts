import { IAccountRepository } from '../repositories/IAccountRepository';

export class GetBalanceByIdUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(
    accountId: string
  ): Promise<{ account_id: string; balance: number }> {
    // loadById => {balance, account_id}
    // substituir o getBalanceByID()

    const account = await this.accountRepository.listById(accountId);

    if (!account) {
      throw new Error('Not found account with this id');
    }

    const { account_id, balance } = account;

    return { account_id, balance };
  }
}
