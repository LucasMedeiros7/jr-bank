import supertest from 'supertest';
import { app } from '../server';

import { prisma } from '../infra/db/database';

describe('Create account', () => {
  beforeAll(async () => {
    await prisma.account.deleteMany();
  });

  it('should create an account', async () => {
    const accountPayload = {
      cpf: '28005264089',
      name: 'Lucas Medeiros',
      password: 'senhaforte'
    };

    const { body } = await supertest(app)
      .post('/accounts')
      .send(accountPayload)
      .expect(201);

    expect(body.message).toBe('Account created');
  });
});
