import { Account } from '../entities/Account';

export interface ICreateAccountDTO {
  cpf: string;
  name: string;
  password: string;
}

export interface IAccountRepository {
  save({ name, password, cpf }: ICreateAccountDTO): Promise<void>;
  listAll(): Promise<Account[]>;
  listByCpf(cpf: string): Promise<Account | undefined>;
  listById(accountId: string): Promise<Account | undefined>;
}
