import { InMemoryAccountRepository } from '../../infra/repositories/InMemoryAccountRepository';
import { CreateAccountUseCase } from './CreateAccountUseCase';

describe('Create account', () => {
  let accountRepository: InMemoryAccountRepository;
  let createAccountUseCase: CreateAccountUseCase;

  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
    createAccountUseCase = new CreateAccountUseCase(accountRepository);
  });

  it('should create an account', async () => {
    await createAccountUseCase.execute({
      name: 'fakename',
      cpf: 'fakecpf123',
      password: 'fakepaswword'
    });

    expect(accountRepository.accounts[0].cpf).toBe('fakecpf123');
    expect(accountRepository.accounts[0].name).toBe('fakename');
    expect(accountRepository.accounts[0].password).toBe('fakepaswword');
  });

  it('should return an error if any parameter is not passed', async () => {
    try {
      await createAccountUseCase.execute({
        name: '',
        cpf: 'fakecpf123',
        password: ''
      });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Missing params: name, password or cpf');
    }

    try {
      await createAccountUseCase.execute({
        name: 'anyname',
        cpf: '',
        password: 'anypassword'
      });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Missing params: name, password or cpf');
    }
  });

  it('should return an error when cpf is invalid', async () => {
    let error: string;

    try {
      await createAccountUseCase.execute({
        name: 'anyname',
        cpf: '',
        password: 'anypassword'
      });
    } catch (err) {
      error = err.message;
    }

    expect(error).toBe('Invalid cpf');
  });
});
