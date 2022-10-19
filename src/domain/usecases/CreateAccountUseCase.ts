import { Cryptography } from '../../utils/Cryptography';
import { fomartCPF, validateCPF } from '../../utils/validateCPF';
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

    if (!validCpf) {
      throw new Error('Invalid cpf');
    }

    const cpfFormatted = fomartCPF(validCpf);

    const hashedPassword = await Cryptography.hash(password);
    const accountAlreadyExists = await this.accountRepository.listByCpf(
      cpfFormatted
    );

    if (accountAlreadyExists) {
      throw new Error('CPF already registered to an account');
    }

    await this.accountRepository.save({
      name,
      password: hashedPassword,
      cpf: cpfFormatted
    });
  }
}
