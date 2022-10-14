import { IAccountRepository } from '../repositories/IAccountRepository';

interface IRequest {
  cpf: string;
  name: string;
  password: string;
}

export class CreateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({ name, password, cpf }: IRequest): Promise<void> {
    if (!name || !password || !cpf) {
      throw new Error('Missing params: name, password or cpf');
    }

    // const isValidCPF = validateCPF(cpf);
    // const hashedPassword = hashPassword(password);

    // if (!isValidCPF) {
    //   throw new Error('Invalid cpf');
    // }
    const accountAlreadyExists = await this.accountRepository.getByCPF(cpf);

    if (accountAlreadyExists) {
      throw new Error('CPF already registered to an account');
    }

    await this.accountRepository.create({ name, password, cpf });
  }
}
