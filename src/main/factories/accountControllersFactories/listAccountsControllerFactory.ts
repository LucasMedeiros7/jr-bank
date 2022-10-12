import { PrismaAccountRepository } from '../../../infra/repositories/PrismaAccountRepository';

import { ListAccountsUseCase } from '../../../domain/account/usecases/listAccounts/ListAccountsUseCase';
import { ListAccountsController } from '../../../domain/account/usecases/listAccounts/ListAccountsController';

const makeListAccountsController = () => {
  const accountRepository = new PrismaAccountRepository();
  const listAccountsUseCase = new ListAccountsUseCase(accountRepository);
  const listAccountsController = new ListAccountsController(
    listAccountsUseCase,
  );

  return listAccountsController;
};

export { makeListAccountsController };
