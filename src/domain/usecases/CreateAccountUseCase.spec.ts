import { InMemoryAccountRepository } from '../../infra/repositories/InMemoryAccountRepository';
import { CreateAccountUseCase } from './CreateAccountUseCase';

describe('Create account use case', () => {
  let accountRepository: InMemoryAccountRepository;
  let createAccountUseCase: CreateAccountUseCase;

  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
    createAccountUseCase = new CreateAccountUseCase(accountRepository);
  });

  it('should create an account', async () => {
    await createAccountUseCase.execute({
      name: 'fakename',
      cpf: '011.144.380-65',
      password: 'fakepaswword'
    });

    const account = await accountRepository.getByCPF('011.144.380-65');

    expect(account.cpf).toBe('011.144.380-65');
  });

  it('should return an error if any parameter is not passed', async () => {
    try {
      await createAccountUseCase.execute({
        name: '',
        cpf: '011.144.380-65',
        password: ''
      });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Missing params: name, password or cpf');
    }

    try {
      await createAccountUseCase.execute({
        name: 'fakename',
        cpf: '',
        password: 'fakepaswword'
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
        name: 'fakename',
        cpf: '12345678912',
        password: 'fakepaswword'
      });
    } catch (err) {
      error = err.message;
    }

    expect(error).toBe('Invalid cpf');
  });

  it('should return an error when cpf already registred', async () => {
    let error: Error;

    try {
      await createAccountUseCase.execute({
        name: 'fakename',
        cpf: '082.096.650-90',
        password: 'fakepaswword'
      });

      await createAccountUseCase.execute({
        name: 'fakename',
        cpf: '082.096.650-90',
        password: 'fakepaswword'
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('CPF already registered to an account');
  });
});
