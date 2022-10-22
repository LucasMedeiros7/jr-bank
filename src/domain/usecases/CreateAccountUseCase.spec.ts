import { InMemoryAccountRepository } from '../../infra/repositories/in-memory/InMemoryAccountRepository';
import { CreateAccountUseCase } from './CreateAccountUseCase';
import { Cryptography } from '../../utils/Cryptography';

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

    const account = await accountRepository.listByCpf('011.144.380-65');

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
    let error: Error;

    try {
      await createAccountUseCase.execute({
        name: 'fakename',
        cpf: '12345678912',
        password: 'fakepaswword'
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid cpf');
  });

  it('should return an error when cpf already registred', async () => {
    const accountPayload = {
      name: 'fakename',
      cpf: '082.096.650-90',
      password: 'fakepaswword'
    };

    let error: Error;

    try {
      await createAccountUseCase.execute(accountPayload);
      await createAccountUseCase.execute(accountPayload);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('CPF already registered to an account');
  });

  it('should encrypt the password', async () => {
    await createAccountUseCase.execute({
      name: 'fakename',
      cpf: '082.096.650-90',
      password: 'fakepaswword'
    });

    const passwordSavedOnDB = accountRepository.accounts[0].password;

    expect(await Cryptography.compare('fakepaswword', passwordSavedOnDB)).toBe(
      true
    );
  });
});
