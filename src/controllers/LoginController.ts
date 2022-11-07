import { Request, Response } from 'express';
import { IAccountRepository } from '../domain/repositories/IAccountRepository';
import { AccountLoginUseCase } from '../domain/usecases/AccountLoginUseCase';

export class LoginController {
  constructor(private accountRepository: IAccountRepository) {}

  async perfom(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;
    const accountLoginUseCase = new AccountLoginUseCase(this.accountRepository);
    try {
      const accessToken = await accountLoginUseCase.execute({ cpf, password });
      return response.json(accessToken);
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }
  }
}
