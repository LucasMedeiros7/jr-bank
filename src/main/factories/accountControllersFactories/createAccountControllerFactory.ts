import { PrismaAccountRepository } from '../../../infra/repositories/PrismaAccountRepository';
import { CreateAccountController } from '../../../domain/account/usecases/createAccount/CreateAccountController';
import { CreateAccountUseCase } from '../../../domain/account/usecases/createAccount/CreateAccountUseCase';

const makeCreateAccountController = () => {
  const accountRepository = new PrismaAccountRepository();
  const createAccountUseCase = new CreateAccountUseCase(accountRepository);
  const createAccountController = new CreateAccountController(
    createAccountUseCase,
  );

  return createAccountController;
};

export { makeCreateAccountController };
