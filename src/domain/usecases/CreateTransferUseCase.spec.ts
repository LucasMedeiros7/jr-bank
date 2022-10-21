import { ITransferRepository } from '../repositories/ITransferRepository';
import { InMemoryAccountRepository } from '../../infra/repositories/InMemoryAccountRepository';
import { InMemoryTransferRepository } from '../../infra/repositories/InMemoryTransferRepository';

import { Account } from '@prisma/client';
import { CreateAccountUseCase } from './CreateAccountUseCase';
import { IAccountRepository } from '../repositories/IAccountRepository';

type input = {
  account_origin_id: string;
  account_destination_id: string;
  amount: number;
};

class TransactionUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({
    account_origin_id,
    account_destination_id,
    amount
  }: input): Promise<void> {
    const destinationAccount = await this.accountRepository.listById(
      account_destination_id
    );

    if (!destinationAccount) {
      throw new Error('Invalid account destination id');
    }

    await this.debitAccount(account_origin_id, amount);
    await this.creditAccount(destinationAccount.account_id, amount);
  }

  private async debitAccount(account_id: string, amount: number) {
    const account = await this.accountRepository.listById(account_id);

    if (amount > account.balance) {
      throw new Error('Insufficient funds');
    }

    const newBalance = account.balance - amount;
    await this.accountRepository.updateBalance(account_id, newBalance);
  }

  private async creditAccount(account_id: string, amount: number) {
    const account = await this.accountRepository.listById(account_id);
    const newBalance = account.balance + amount;
    await this.accountRepository.updateBalance(account_id, newBalance);
  }
}

class CreateTransferUseCase {
  constructor(
    private transferRepository: ITransferRepository,
    private accountRepository: IAccountRepository
  ) {}

  async execute({
    account_origin_id,
    account_destination_id,
    amount
  }: input): Promise<void> {
    const transactionUseCase = new TransactionUseCase(this.accountRepository);

    try {
      await transactionUseCase.execute({
        account_origin_id,
        account_destination_id,
        amount
      });
    } catch (err) {
      throw new Error(err.message);
    }

    await this.transferRepository
      .save({
        account_origin_id,
        account_destination_id,
        amount
      })
      .catch((err) => console.log(err));
  }
}

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
      password: '123456',
      cpf: '970.185.460-87'
    });

    await createAccountUseCase.execute({
      name: 'Fulano2',
      password: '1234567',
      cpf: '469.319.560-00'
    });

    const accountsRegistredForTest = await accountRepository.listAll();

    return accountsRegistredForTest;
  };

  it('should create an transfer', async () => {
    const [origin_account, destination_account] =
      await makeFakeAccountsForTest();

    await createTransferUseCase.execute({
      account_origin_id: origin_account.account_id,
      account_destination_id: destination_account.account_id,
      amount: 50
    });

    expect(await transferRepository.listAll()).toHaveLength(1);
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
  });

  it('should credit the exact amount to the account that received the transfer', async () => {
    const [origin_account, destination_account] =
      await makeFakeAccountsForTest();

    await createTransferUseCase.execute({
      account_origin_id: origin_account.account_id,
      account_destination_id: destination_account.account_id,
      amount: 10000
    });

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

    await createTransferUseCase.execute(transfer);

    try {
      await createTransferUseCase.execute(transfer);
    } catch (error) {
      expectedError = error;
    }

    expect(expectedError).toBeInstanceOf(Error);
    expect(expectedError.message).toBe('Insufficient funds');
    expect(origin_account.balance).toBe(10000);
    expect(destination_account.balance).toBe(90000);
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
  });
});
