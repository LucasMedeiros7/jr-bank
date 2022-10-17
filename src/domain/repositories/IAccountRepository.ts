import { Account } from '../entities/Account';

type input = {
  cpf: string;
  name: string;
  password: string;
};

export interface IAccountRepository {
  save({ name, password, cpf }: input): Promise<void>;
  listAll(): Promise<Account[]>;
  listByCpf(cpf: string): Promise<Account | undefined>;
  listById(accountId: string): Promise<Account | undefined>;
}
