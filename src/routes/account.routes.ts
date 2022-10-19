import { Router } from 'express';
import { AccountController } from '../controllers/CreateAccountController';

const accountRoutes = Router();

accountRoutes.post('/', AccountController.create);
accountRoutes.get('/', AccountController.getBalance);
accountRoutes.get('/:account_id/balance', AccountController.list);

export { accountRoutes };
