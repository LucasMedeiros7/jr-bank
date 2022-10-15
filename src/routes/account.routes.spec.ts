import supertest from 'supertest';
import { app } from '../server';

import { prisma } from '../infra/db/database';

describe('Create account', () => {
  it('should create an account', async () => {
    const accountPayload = {
      cpf: '280.052.640-89',
      name: 'Lucas Medeiros',
      password: 'senhaforte'
    };

    await prisma.account.deleteMany({
      where: {
        cpf: accountPayload.cpf
      }
    });

    await supertest(app).post('/accounts').send(accountPayload).expect(201);
  });
});
