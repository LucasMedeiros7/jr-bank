import {
  IAccountRepository,
  IBalanceDTO,
} from '../../repositories/IAccountRepository';

export class GetBalanceByIdUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(accountId: string): Promise<IBalanceDTO> {
    const balance = await this.accountRepository.getBalanceById(accountId);
    return balance;
  }
}
