import { Transfer } from '../entities/Transfer';
import { ITransferRepository } from '../repositories/ITransferRepository';

export class ListTransfersUseCase {
  constructor(private transferRepository: ITransferRepository) {}

  async execute(): Promise<Transfer[]> {
    const transfers = await this.transferRepository.listAll();
    return transfers;
  }
}
