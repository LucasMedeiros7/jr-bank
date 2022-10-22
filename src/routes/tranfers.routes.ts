import { Router } from 'express';
import { PrismaAccountRepository } from '../infra/repositories/PrismaAccountRepository';

import { PrismaTransferRepository } from '../infra/repositories/PrismaTransferRepository';
import { TransfersController } from '../controllers/TransfersController';

const transfersRoutes = Router();

const transferRepository = new PrismaTransferRepository();
const accountRepository = new PrismaAccountRepository();

const transfersController = new TransfersController(
  accountRepository,
  transferRepository
);

transfersRoutes.post('/', (request, response) => {
  transfersController.create(request, response);
});
transfersRoutes.get('/', (request, response) => {
  transfersController.list(request, response);
});

export { transfersRoutes };
