import { v4 as uuidv4 } from 'uuid';

import { Account } from '../../../domain/entities/Account';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepository';

type input = {
  cpf: string;
  name: string;
  password: string;
};

export class InMemoryAccountRepository implements IAccountRepository {
  accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  async save({ name, password, cpf }: input): Promise<void> {
    const account = {
      account_id: uuidv4(),
      balance: 50000,
      created_at: new Date(),
      name,
      password,
      cpf
    };

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
