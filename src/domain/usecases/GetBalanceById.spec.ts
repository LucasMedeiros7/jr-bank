import { InMemoryAccountRepository } from '../../infra/repositories/InMemoryAccountRepository';
import { CreateAccountUseCase } from './CreateAccountUseCase';
import { GetBalanceByIdUseCase } from './GetBalanceByIdUseCase';

describe('Get balance by id use case', () => {
  let accountRepository: InMemoryAccountRepository;
  let getBalanceByIdUseCase: GetBalanceByIdUseCase;
  let createAccountUseCase: CreateAccountUseCase;

  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
    getBalanceByIdUseCase = new GetBalanceByIdUseCase(accountRepository);
    createAccountUseCase = new CreateAccountUseCase(accountRepository);
  });

  it('should return just account id and balance', async () => {
    await createAccountUseCase.execute({
      name: 'Lucas',
      cpf: '123.998.890-70',
      password: 'sistema123teste'
    });

    const { account_id } = accountRepository.accounts.find(
      (account) => account.cpf === '123.998.890-70'
    );

    const balance = await getBalanceByIdUseCase.execute(account_id);

    expect(balance).toHaveProperty('account_id');
    expect(balance).toHaveProperty('balance');
    expect(balance.balance).toBe(50000);
    expect(balance.account_id).toBe(account_id);
  });

  it('should return an error when account id not exists', async () => {
    await createAccountUseCase.execute({
      name: 'John',
      cpf: '188.847.190-54',
      password: 'fakepassword'
    });

    expect(async () => {
      await getBalanceByIdUseCase.execute('123.998.890-70');
    }).rejects.toThrowError();
  });
});
