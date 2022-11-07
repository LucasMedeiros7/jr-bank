import { Router } from 'express';
import { accountRoutes } from './account.routes';
import { loginRoutes } from './login.routes';
import { transfersRoutes } from './tranfers.routes';

const routes = Router();

routes.use('/accounts', accountRoutes);
routes.use('/transfers', transfersRoutes);
routes.use('/login', loginRoutes);

export { routes };
