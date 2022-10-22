import { InMemoryAccountRepository } from '../../infra/repositories/in-memory/InMemoryAccountRepository';
import { InMemoryTransferRepository } from '../../infra/repositories/in-memory/InMemoryTransferRepository';
import { CreateTransferUseCase } from './CreateTransferUseCase';

import { CreateAccountUseCase } from './CreateAccountUseCase';
import { ListTransfersUseCase } from './ListTransfersUseCase';

describe('List all transfers use case', () => {
  let createTransferUseCase: CreateTransferUseCase;

  let accountRepository: InMemoryAccountRepository;
  let transferRepository: InMemoryTransferRepository;

  let listTransfersUseCase: ListTransfersUseCase;

  beforeEach(async () => {
    accountRepository = new InMemoryAccountRepository();
    transferRepository = new InMemoryTransferRepository();
    listTransfersUseCase = new ListTransfersUseCase(transferRepository);

    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    await createAccountUseCase.execute({
      name: 'Ciclano',
      password: 'ciclano1234567',
      cpf: '469.319.560-00'
    });

    await createAccountUseCase.execute({
      name: 'Fulano',
      password: 'fulano1234567',
      cpf: '970.185.460-87'
    });
  });

  const createTransferForTest = async (
    account_origin_id: string,
    account_destination_id: string,
    transfersQuantity = 1
  ) => {
    createTransferUseCase = new CreateTransferUseCase(
      transferRepository,
      accountRepository
    );

    for (let i = 0; i < transfersQuantity; i++) {
      await createTransferUseCase.execute({
        account_origin_id,
        account_destination_id,
        amount: 100
      });
    }
  };

  it('should list five registered transfers', async () => {
    await createTransferForTest(
      accountRepository.accounts[0].account_id,
      accountRepository.accounts[1].account_id,
      5
    );

    expect(await listTransfersUseCase.execute()).toHaveLength(5);
  });

  it('should list 100 registered transfers', async () => {
    await createTransferForTest(
      accountRepository.accounts[0].account_id,
      accountRepository.accounts[1].account_id,
      100
    );

    expect(await listTransfersUseCase.execute()).toHaveLength(100);
  });
});
