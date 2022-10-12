import { Router } from 'express';
import { accountRoutes } from './account.routes';

const routes = Router();

routes.use('/accounts', accountRoutes);

export { routes };
