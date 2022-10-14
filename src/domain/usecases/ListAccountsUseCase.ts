import { Account } from '../entities/Account';
import { IAccountRepository } from '../repositories/IAccountRepository';

export class ListAccountsUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(): Promise<Account[]> {
    const accounts = await this.accountRepository.getAll();
    return accounts;
  }
}
