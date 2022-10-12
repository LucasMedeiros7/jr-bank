import { IAccountRepository } from '../repositories/IAccountRepository';

interface IRequest {
  cpf: string;
  name: string;
  password: string;
}

export class CreateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({ name, password, cpf }: IRequest) {
    await this.accountRepository.create({ name, password, cpf });
  }
}
