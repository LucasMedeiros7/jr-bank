import dotenv from 'dotenv';
dotenv.config();

import JWT from 'jsonwebtoken';
import { Cryptography } from '../../utils/Cryptography';
import { fomartCPF } from '../../utils/validateCPF';
import { IAccountRepository } from '../repositories/IAccountRepository';

type input = {
  cpf: string;
  password: string;
};

export class AccountLoginUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({ cpf, password }: input): Promise<{ accessToken: string }> {
    const account = await this.accountRepository.listByCpf(fomartCPF(cpf));

    if (!account) {
      throw new Error('Non-existing account');
    }

    const isValidPassword = await Cryptography.compare(
      password,
      account.password
    );

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = JWT.sign(
      { accountId: account.account_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    return { accessToken: token };
  }
}
