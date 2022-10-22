import { Router } from 'express';

import { accountRoutes } from './account.routes';
import { transfersRoutes } from './tranfers.routes';

const routes = Router();

routes.use('/accounts', accountRoutes);
routes.use('/transfers', transfersRoutes);

export { routes };
