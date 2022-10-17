import cryptography from '../../utils/Cryptography';
import { validateCPF } from '../../utils/validateCPF';
import { Account } from '../entities/Account';
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

    const validCpf = validateCPF(cpf);

    if (validCpf === 'Invalid cpf') {
      throw new Error(validCpf);
    }

    const hashedPassword = await cryptography.hash(password);

    const accountAlreadyExists = await this.accountRepository.listByCpf(cpf);

    if (accountAlreadyExists) {
      throw new Error('CPF already registered to an account');
    }

    await this.accountRepository.save({
      name,
      password: hashedPassword,
      cpf: validCpf
    });
  }
}
