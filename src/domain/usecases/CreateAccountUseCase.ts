import { validateCPF } from '../../utils/validateCPF';
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

    cpf = validateCPF(cpf);

    if (cpf === 'Invalid cpf') {
      throw new Error(cpf);
    }

    // const hashedPassword = hashPassword(password);

    const accountAlreadyExists = await this.accountRepository.getByCPF(cpf);

    if (accountAlreadyExists) {
      throw new Error('CPF already registered to an account');
    }

    await this.accountRepository.create({ name, password, cpf });
  }
}
