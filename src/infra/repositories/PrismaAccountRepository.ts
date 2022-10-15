import { Account } from '../../domain/entities/Account';

import {
  IAccountRepository,
  IBalanceDTO,
  ICreateAccountDTO
} from '../../domain/repositories/IAccountRepository';

import { prisma } from '../db/database';

export class PrismaAccountRepository implements IAccountRepository {
  async create({ name, password, cpf }: ICreateAccountDTO): Promise<Account> {
    const accountCreated = await prisma.account.create({
      data: {
        name,
        password,
        cpf
      }
    });

    return accountCreated;
  }

  async getByCPF(cpf: string): Promise<Account> {
    const account = await prisma.account.findUnique({ where: { cpf } });
    return account;
  }

  async getAll(): Promise<Account[]> {
    const accounts = await prisma.account.findMany();
    return accounts;
  }

  async getBalanceById(accountId: string): Promise<IBalanceDTO> {
    const balance = await prisma.account.findUnique({
      where: {
        account_id: accountId
      },
      select: {
        account_id: true,
        balance: true
      }
    });

    return balance;
  }
}
