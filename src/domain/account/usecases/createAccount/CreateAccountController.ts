import { Request, Response } from 'express';
import { CreateAccountUseCase } from './CreateAccountUseCase';

export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, password } = request.body;

    await this.createAccountUseCase.execute({ name, cpf, password });

    return response.sendStatus(201);
  }
}
