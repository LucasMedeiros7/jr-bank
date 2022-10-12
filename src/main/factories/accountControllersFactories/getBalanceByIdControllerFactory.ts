import { PrismaAccountRepository } from '../../../infra/repositories/PrismaAccountRepository';

import { GetBalanceByIdUseCase } from '../../../domain/account/usecases/getBalanceById/GetBalanceByIdUseCase';
import { GetBalanceByIdController } from '../../../domain/account/usecases/getBalanceById/GetBalanceByIdController';

const makeGetBalanceByIdController = () => {
  const accountRepository = new PrismaAccountRepository();
  const getBalanceByIdUseCase = new GetBalanceByIdUseCase(accountRepository);
  const getBalanceByIdController = new GetBalanceByIdController(
    getBalanceByIdUseCase,
  );

  return getBalanceByIdController;
};

export { makeGetBalanceByIdController };
