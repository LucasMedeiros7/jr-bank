import { Account } from '../../domain/entities/Account';
import { v4 as uuidv4 } from 'uuid';

import {
  IAccountRepository,
  ICreateAccountDTO,
  IBalanceDTO
} from '../../domain/repositories/IAccountRepository';

export class InMemoryAccountRepository implements IAccountRepository {
  accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  async create({ name, password, cpf }: ICreateAccountDTO): Promise<void> {
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

  getAll(): Promise<Account[]> {
    throw new Error('Method not implemented.');
  }
  getBalanceById(accountId: string): Promise<IBalanceDTO> {
    throw new Error('Method not implemented.');
  }
}
