import { ITransferRepository } from '../repositories/ITransferRepository';
import { IAccountRepository } from '../repositories/IAccountRepository';
import { InMemoryAccountRepository } from '../../infra/repositories/InMemoryAccountRepository';
import { DebitAccountUseCase } from './DebitAccountUseCase';
import { InMemoryTransferRepository } from '../../infra/repositories/InMemoryTransferRepository';
import { CreateAccountUseCase } from './CreateAccountUseCase';
import { Account } from '@prisma/client';

class CreditAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(account_id: string, amount: number): Promise<void> {
    // implementa o repo direto nele
    // pega no repository pelo balance => account id find()
    // nao aceitar float de alguma forma para nao atrapalhar a conta
    // newbalance = balance + amount
    // update no banco => prisma.account.update(id, newbalance)
  }
}

type input = {
  account_origin_id: string;
  account_destination_id: string;
  amount: number;
};

class CreateTransferUseCase {
  constructor(
    private transferRepository: ITransferRepository,
    private debitAccountUseCase: DebitAccountUseCase,
    private creditAccountUseCase: CreditAccountUseCase
  ) {}

  async execute({
    account_origin_id,
    account_destination_id,
    amount
  }: input): Promise<void> {
    try {
      await this.debitAccountUseCase.execute(account_origin_id, amount);
      await this.creditAccountUseCase.execute(account_destination_id, amount);
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
  let debitAccountUseCase: DebitAccountUseCase;
  let creditAccountUseCase: CreditAccountUseCase;

  let createTransferUseCase: CreateTransferUseCase;

  beforeEach(() => {
    transferRepository = new InMemoryTransferRepository();
    accountRepository = new InMemoryAccountRepository();

    debitAccountUseCase = new DebitAccountUseCase(accountRepository);
    creditAccountUseCase = new CreditAccountUseCase(accountRepository);

    createTransferUseCase = new CreateTransferUseCase(
      transferRepository,
      debitAccountUseCase,
      creditAccountUseCase
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
});
