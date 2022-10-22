import { Account } from '../../../domain/entities/Account';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepository';

export class InMemoryAccountRepository implements IAccountRepository {
  accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  async save(account: Account): Promise<void> {
    this.accounts.push(account);
  }

  async listByCpf(cpf: string): Promise<Account> {
    const account = this.accounts.find((account) => account.cpf === cpf);
    return account;
  }

  async listAll(): Promise<Account[]> {
    return this.accounts;
  }

  async listById(accountId: string): Promise<Account | undefined> {
    const account = this.accounts.find(
      (account) => account.account_id === accountId
    );

    return account;
  }

  async updateBalance(
    accountId: string,
    balanceUpdated: number
  ): Promise<void> {
    const account = this.accounts.find(
      (account) => account.account_id === accountId
    );

    account.balance = balanceUpdated;
  }
}
