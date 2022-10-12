import { IAccountRepository } from '../repositories/IAccountRepository';

export class ListAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute() {
    const accounts = await this.accountRepository.getAll();
    return accounts;
  }
}
