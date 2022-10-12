import { Account } from '../entities/Account';

export interface ICreateAccountDTO {
  cpf: string;
  name: string;
  password: string;
}

export interface IBalanceDTO {
  account_id: string;
  balance: number;
}

export interface IAccountRepository {
  create({ name, password, cpf }: ICreateAccountDTO): Promise<void>;
  getAll(): Promise<Account[]>;
  getBalanceById(accountId: string): Promise<IBalanceDTO>;
}
