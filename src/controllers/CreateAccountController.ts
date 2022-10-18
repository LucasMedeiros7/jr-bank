import { Request, Response } from 'express';
import { CreateAccountUseCase } from '../domain/usecases/CreateAccountUseCase';
import { PrismaAccountRepository } from '../infra/repositories/PrismaAccountRepository';

class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, password } = request.body;

    const accountRepository = new PrismaAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    try {
      await createAccountUseCase.execute({
        name,
        cpf,
        password
      });

      return response
        .status(201)
        .json({ message: 'Account created successfully' });
    } catch (e) {
      return response.status(500).json({ error: e.message });
    }
  }
}

export const createAccountController = new CreateAccountController();
