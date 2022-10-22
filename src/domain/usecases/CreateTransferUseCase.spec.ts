import { InMemoryAccountRepository } from '../../infra/repositories/in-memory/InMemoryAccountRepository';
import { InMemoryTransferRepository } from '../../infra/repositories/in-memory/InMemoryTransferRepository';

import { Account } from '../entities/Account';
import { CreateAccountUseCase } from './CreateAccountUseCase';
import { CreateTransferUseCase } from './CreateTransferUseCase';

describe('Create transfer use case', () => {
  let transferRepository: InMemoryTransferRepository;
  let accountRepository: InMemoryAccountRepository;

  let createTransferUseCase: CreateTransferUseCase;

  beforeEach(() => {
    transferRepository = new InMemoryTransferRepository();
    accountRepository = new InMemoryAccountRepository();

    createTransferUseCase = new CreateTransferUseCase(
      transferRepository,
      accountRepository
    );
  });

  const makeFakeAccountsForTest = async (): Promise<Account[]> => {
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    await createAccountUseCase.execute({
      name: 'Fulano',
      password: 'fulano1234567',
      cpf: '970.185.460-87'
    });

    await createAccountUseCase.execute({
      name: 'Ciclano',
      password: 'ciclano1234567',
      cpf: '469.319.560-00'
    });

    const accountsRegistredForTest = await accountRepository.listAll();
    return accountsRegistredForTest;
  };

  it('should be able to create transfers', async () => {
    const [origin_account, destination_account] =
      await makeFakeAccountsForTest();

    const transfer = {
      account_origin_id: origin_account.account_id,
      account_destination_id: destination_account.account_id,
      amount: 50
    };

    await createTransferUseCase.execute(transfer);
    await createTransferUseCase.execute(transfer);

    expect(await transferRepository.listAll()).toHaveLength(2);
  });

  it('should debit the exact amount from the account that made the transfer', async () => {
    const [origin_account, destination_account] =
      await makeFakeAccountsForTest();

    await createTransferUseCase.execute({
      account_origin_id: origin_account.account_id,
      account_destination_id: destination_account.account_id,
      amount: 10000
    });

    expect(origin_account.balance).toBe(40000);
    expect(destination_account.balance).toBe(60000);
  });

  it('should credit the exact amount to the account that received the transfer', async () => {
    const [origin_account, destination_account] =
      await makeFakeAccountsForTest();

    await createTransferUseCase.execute({
      account_origin_id: origin_account.account_id,
      account_destination_id: destination_account.account_id,
      amount: 10000
    });

    expect(origin_account.balance).toBe(40000);
    expect(destination_account.balance).toBe(60000);
  });

  it('should return an error when the transfer amount is less than the total account balance', async () => {
    let expectedError: Error;

    const [origin_account, destination_account] =
      await makeFakeAccountsForTest();

    const transfer = {
      account_origin_id: origin_account.account_id,
      account_destination_id: destination_account.account_id,
      amount: 40000
    };

    try {
      await createTransferUseCase.execute(transfer);
      await createTransferUseCase.execute(transfer);
    } catch (error) {
      expectedError = error;
    }

    expect(expectedError).toBeInstanceOf(Error);
    expect(expectedError.message).toBe('Insufficient funds');
    expect(origin_account.balance).toBe(10000);
    expect(destination_account.balance).toBe(90000);
    expect(await transferRepository.listAll()).toHaveLength(1);
  });

  it('should return an error when the destination account not exists', async () => {
    const [origin_account] = await makeFakeAccountsForTest();

    let expectedError: Error;

    try {
      await createTransferUseCase.execute({
        account_origin_id: origin_account.account_id,
        account_destination_id: 'randomID',
        amount: 20000
      });
    } catch (error) {
      expectedError = error;
    }

    expect(expectedError).toBeInstanceOf(Error);
    expect(expectedError.message).toBe('Invalid account destination id');
    expect(origin_account.balance).toBe(50000);
    expect(await transferRepository.listAll()).toHaveLength(0);
  });

  it('should return an error when the number passed is float', async () => {
    const [origin_account, destination_account] =
      await makeFakeAccountsForTest();

    let expectedError: Error;

    try {
      await createTransferUseCase.execute({
        account_origin_id: origin_account.account_id,
        account_destination_id: destination_account.account_id,
        amount: 2.5
      });
    } catch (error) {
      expectedError = error;
    }

    expect(expectedError.message).toBe('The amount must be an integer');
    expect(origin_account.balance).toBe(50000);
    expect(destination_account.balance).toBe(50000);
    expect(await transferRepository.listAll()).toHaveLength(0);
  });
});
