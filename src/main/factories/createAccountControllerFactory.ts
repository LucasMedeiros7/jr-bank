import { PrismaAccountRepository } from '../../infra/repositories/PrismaAccountRepository';
import { CreateAccountController } from '../../domain/account/usecases/CreateAccountController';
import { CreateAccountUseCase } from '../../domain/account/usecases/CreateAccountUseCase';

const makeCreateAccountController = () => {
  const accountRepository = new PrismaAccountRepository();
  const createAccountUseCase = new CreateAccountUseCase(accountRepository);
  const createAccountController = new CreateAccountController(
    createAccountUseCase,
  );

  return createAccountController;
};

export { makeCreateAccountController };
