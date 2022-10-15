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

  /**
   * # Melhorias
   *  - Passar a responsabilidade de modelagem da conta para entities/model
   *  - CreateAccountUseCase vai ficar responsavel em instanciar o model de conta
   *  - Chamar o repositório
   *  - Verificar se a conta já existe
   *  - Retornar a conta ou lançar um erro caso a conta já exista
   *
   */

  async execute({ name, password, cpf }: IRequest): Promise<Account> {
    if (!name || !password || !cpf) {
      throw new Error('Missing params: name, password or cpf');
    }

    const validCpf = validateCPF(cpf);

    if (validCpf === 'Invalid cpf') {
      throw new Error(validCpf);
    }

    const hashedPassword = await cryptography.hash(password);

    const accountAlreadyExists = await this.accountRepository.getByCPF(cpf);

    if (accountAlreadyExists) {
      throw new Error('CPF already registered to an account');
    }

    const accountCreated = await this.accountRepository.create({
      name,
      password: hashedPassword,
      cpf: validCpf
    });

    return accountCreated;
  }
}
