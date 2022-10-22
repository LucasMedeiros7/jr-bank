import { InMemoryAccountRepository } from '../../infra/repositories/in-memory/InMemoryAccountRepository';
import { CreateAccountUseCase } from './CreateAccountUseCase';
import { ListAccountsUseCase } from './ListAccountsUseCase';

describe('Get balance by id use case', () => {
  it('should list all accounts registered', async () => {
    const accountRepository = new InMemoryAccountRepository();
    const listAccountsUseCase = new ListAccountsUseCase(accountRepository);
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    await createAccountUseCase.execute({
      name: 'Lucas',
      cpf: '123.998.890-70',
      password: 'sistema123teste'
    });

    await createAccountUseCase.execute({
      name: 'John',
      cpf: '188.847.190-54',
      password: 'fakepassword'
    });

    const allAccounts = await listAccountsUseCase.execute();

    expect(allAccounts).toHaveLength(2);
    expect(allAccounts).toMatchObject([
      {
        name: 'Lucas',
        cpf: '123.998.890-70'
      },
      {
        name: 'John',
        cpf: '188.847.190-54'
      }
    ]);
  });
});
