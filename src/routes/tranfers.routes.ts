import { Request, Response, Router } from 'express';
import { PrismaAccountRepository } from '../infra/repositories/PrismaAccountRepository';

import { PrismaTransferRepository } from '../infra/repositories/PrismaTransferRepository';
import { TransfersController } from '../controllers/TransfersController';
import JWT from 'jsonwebtoken';

const transfersRoutes = Router();

const transferRepository = new PrismaTransferRepository();
const accountRepository = new PrismaAccountRepository();
const transfersController = new TransfersController(
  accountRepository,
  transferRepository
);

function authMiddleware(request: Request, response: Response, next: Function) {
  const { authorization } = request.headers;
  const token = authorization.split(' ')[1];

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account_id) => {
    if (err) {
      return response.status(403);
    }
    request.account_origin_id = account_id;
    return response.json(account_id);
  });
}

transfersRoutes.post('/', authMiddleware, (request, response) => {
  transfersController.create(request, response);
});
transfersRoutes.get('/', (request, response) => {
  transfersController.list(request, response);
});

export { transfersRoutes };
