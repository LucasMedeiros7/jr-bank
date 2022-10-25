import { InMemoryAccountRepository } from '../../infra/repositories/in-memory/InMemoryAccountRepository';
import { AccountLoginUseCase } from './AccountLoginUseCase';
import { CreateAccountUseCase } from './CreateAccountUseCase';

describe('Account Login', () => {
  let accountRepository: InMemoryAccountRepository;
  let createAccountUseCase: CreateAccountUseCase;
  let accountLoginUseCase: AccountLoginUseCase;

  beforeAll(async () => {
    accountRepository = new InMemoryAccountRepository();
    createAccountUseCase = new CreateAccountUseCase(accountRepository);
    accountLoginUseCase = new AccountLoginUseCase(accountRepository);

    await createAccountUseCase.execute({
      name: 'Ciclano',
      password: 'ciclano1234567',
      cpf: '469.319.560-00'
    });
  });

  it('should be able login account', async () => {
    const response = await accountLoginUseCase.execute({
      cpf: '469.319.560-00',
      password: 'ciclano1234567'
    });

    expect(response).toHaveProperty('accessToken');
  });

  it('should return an error when cpf is not a registered account', async () => {
    await accountLoginUseCase
      .execute({
        cpf: '586.686.330-82',
        password: 'ciclano1234567'
      })
      .then((response) => expect(response).toBeInstanceOf(Error))
      .catch((err) => expect(err.message).toBe('Non-existing account'));
  });

  it('should return an error when the password is invalid', async () => {
    await accountLoginUseCase
      .execute({
        cpf: '469.319.560-00',
        password: 'wrongpassword'
      })
      .then((response) => expect(response).toBeInstanceOf(Error))
      .catch((err) => expect(err.message).toBe('Invalid password'));
  });
});
