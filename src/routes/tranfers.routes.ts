import { Request, Response, Router } from 'express';
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

// function authMiddleware(request: Request, response: Response, next: Function) {
//   const { authorization } = request.headers;

//   const token = authorization.split(' ')[1]
//   const account_origin_id = // JWT

//   request.account_origin_id = authorization;

//   next();
// }

transfersRoutes.post('/', (request, response) => {
  transfersController.create(request, response);
});
transfersRoutes.get('/', (request, response) => {
  transfersController.list(request, response);
});

export { transfersRoutes };
