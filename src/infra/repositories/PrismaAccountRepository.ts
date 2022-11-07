import { prisma } from '../db/database';
import { Account } from '../../domain/entities/Account';
import { IAccountRepository } from '../../domain/repositories/IAccountRepository';

export class PrismaAccountRepository implements IAccountRepository {
  async save(account: Account): Promise<void> {
    await prisma.account.create({ data: account });
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
    // console.log(accountId, 'log');

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
