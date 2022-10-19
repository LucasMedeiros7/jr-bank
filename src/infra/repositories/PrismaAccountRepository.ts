import { Account } from '../../domain/entities/Account';
import { IAccountRepository } from '../../domain/repositories/IAccountRepository';

import { prisma } from '../db/database';

type input = {
  cpf: string;
  name: string;
  password: string;
};

export class PrismaAccountRepository implements IAccountRepository {
  async save({ name, password, cpf }: input): Promise<void> {
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
    const account = await prisma.account.findUnique({
      where: { account_id: accountId }
    });
    return account;
  }

  async updateBalance(
    accountId: string,
    balanceUpdated: number
  ): Promise<void> {
    await prisma.account.update({
      where: { account_id: accountId },
      data: { balance: balanceUpdated }
    });
  }
}
