import { PrismaAccountRepository } from '../repositories/implementations/PrismaAccountRepository';
import { CreateAccountController } from '../usecases/CreateAccountController';
import { CreateAccountUseCase } from '../usecases/CreateAccountUseCase';

const makeCreateAccountController = () => {
  const accountRepository = new PrismaAccountRepository();
  const createAccountUseCase = new CreateAccountUseCase(accountRepository);
  const createAccountController = new CreateAccountController(
    createAccountUseCase,
  );

  return createAccountController;
};

export default makeCreateAccountController;
