import { Transfer } from '../entities/Transfer';
import { ITransferRepository } from '../repositories/ITransferRepository';

class CreateTransferUseCase {
  constructor(private transferRepository: ITransferRepository) {}

  async execute({
    account_origin_id,
    account_destination_id,
    amount
  }: input): Promise<void> {
    await this.transferRepository.save({
      account_origin_id,
      account_destination_id,
      amount
    });
  }
}
type input = {
  account_origin_id: string;
  account_destination_id: string;
  amount: number;
};

class InMemoryTransferRepository implements ITransferRepository {
  transfers: Transfer[];

  constructor() {
    this.transfers = [];
  }

  async save({
    account_origin_id,
    account_destination_id,
    amount
  }: input): Promise<void> {
    const transfer = {
      transferId: 'faketransfer123456',
      account_origin_id,
      account_destination_id,
      amount,
      created_at: new Date()
    };

    this.transfers.push(transfer);
  }

  async listAll(): Promise<Transfer[]> {
    return this.transfers;
  }
}

describe('Create transfer use case', () => {
  it('should create an transfer', async () => {
    const transferRepository = new InMemoryTransferRepository();
    const createTransferUseCase = new CreateTransferUseCase(transferRepository);

    createTransferUseCase.execute({
      account_origin_id: 'any_id_Ori',
      account_destination_id: 'any_id_Dest',
      amount: 50
    });

    expect(await transferRepository.listAll()).toHaveLength(1);
  });
});
