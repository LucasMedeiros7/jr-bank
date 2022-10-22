import { Cryptography } from '../../utils/Cryptography';
import { fomartCPF, validateCPF } from '../../utils/validateCPF';
import { Account } from '../entities/Account';
import { IAccountRepository } from '../repositories/IAccountRepository';

interface IRequest {
  cpf: string;
  name: string;
  password: string;
}

export class CreateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({ name, password, cpf }: IRequest): Promise<Account> {
    if (!name || !password || !cpf) {
      throw new Error('Missing params: name, password or cpf');
    }

    if (!validateCPF(cpf)) {
      throw new Error('Invalid cpf');
    }

    const cpfFormatted = fomartCPF(cpf);
    const hashedPassword = await Cryptography.hash(password);

    const newAccount = new Account({
      name,
      password: hashedPassword,
      cpf: cpfFormatted
    });

    const accountAlreadyExists = await this.accountRepository.listByCpf(
      newAccount.cpf
    );

    if (accountAlreadyExists) {
      throw new Error('CPF already registered to an account');
    }

    await this.accountRepository.save(newAccount);

    return newAccount;
  }
}
