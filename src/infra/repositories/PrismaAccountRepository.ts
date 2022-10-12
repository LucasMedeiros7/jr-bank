import { Account } from '../../domain/entities/Account';
import { prisma } from '../db/database';

import {
  IAccountRepository,
  ICreateAccountDTO,
  IBalanceDTO
} from '../../domain/repositories/IAccountRepository';

export class PrismaAccountRepository implements IAccountRepository {
  async create({ name, password, cpf }: ICreateAccountDTO): Promise<void> {
    await prisma.account.create({
      data: {
        name,
        password,
        cpf
      }
    });
  }

  async getAll(): Promise<Account[]> {
    const accounts = await prisma.account.findMany();
    return accounts;
  }

  async getBalanceById(accountId: string): Promise<IBalanceDTO> {
    const balance = await prisma.account.findFirst({
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
