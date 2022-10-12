import { InMemoryAccountRepository } from '../../infra/repositories/InMemoryAccountRepository';
import { CreateAccountUseCase } from './CreateAccountUseCase';

describe('Create account', () => {
  it('should create an account', () => {
    const accountRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    createAccountUseCase.execute({
      name: 'fakename',
      cpf: 'fakecpf123',
      password: 'fakepaswword'
    });

    expect(accountRepository.accounts[0].cpf).toBe('fakecpf123');
  });
});
