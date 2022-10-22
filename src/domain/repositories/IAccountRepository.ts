import { Account } from '../entities/Account';

export interface IAccountRepository {
  save(account: Account): Promise<void>;
  listAll(): Promise<Account[]>;
  listByCpf(cpf: string): Promise<Account | undefined>;
  listById(accountId: string): Promise<Account | undefined>;
  updateBalance(accountId: string, balanceUpdated: number): Promise<void>;
}
