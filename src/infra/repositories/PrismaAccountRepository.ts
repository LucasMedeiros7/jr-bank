import { Account } from '../../domain/entities/Account';

import {
  IAccountRepository,
  ICreateAccountDTO
} from '../../domain/repositories/IAccountRepository';

import { prisma } from '../db/database';

export class PrismaAccountRepository implements IAccountRepository {
  async save({ name, password, cpf }: ICreateAccountDTO): Promise<void> {
    await prisma.account.create({ data: { name, password, cpf } });
  }

  async listByCpf(cpf: string): Promise<Account> {
    const account = await prisma.account.findUnique({ where: { cpf } });
    return account;
  }

  async listAll(): Promise<Account[]> {
    const accounts = await prisma.account.findMany();
    return accounts;
  }

  async listById(accountId: string): Promise<Account> {
    const balance = await prisma.account.findUnique({
      where: { account_id: accountId }
    });
    return balance;
  }
}
