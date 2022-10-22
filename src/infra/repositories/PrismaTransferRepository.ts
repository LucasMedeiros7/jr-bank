import { prisma } from '../db/database';
import { Transfer } from '../../domain/entities/Transfer';
import { ITransferRepository } from '../../domain/repositories/ITransferRepository';

export class PrismaTransferRepository implements ITransferRepository {
  async save(transfer: Transfer): Promise<void> {
    await prisma.transfer.create({ data: transfer });
  }
  async listAll(): Promise<Transfer[]> {
    const transfers = await prisma.transfer.findMany();
    return transfers;
  }
}
