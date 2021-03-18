import { Router } from 'express';

import { protectedRoute } from '../middleware/authorization';

import userRoutes from './user';
import plansRoutes from './plans';
import lendersRoutes from './lenders';
import externalRoutes from './external';
import partnersRoutes from './partners';
import benefitsRoutes from './benefits';
import utilitiesRoutes from './utilities';
import portfoliosRoutes from './portfolios';

const router = Router();

router.use('/user', userRoutes);

router.use(protectedRoute);

router.use('/plans', plansRoutes);
router.use('/lenders', lendersRoutes);
router.use('/partners', partnersRoutes);
router.use('/benefits', benefitsRoutes);
router.use('/externals', externalRoutes);
router.use('/portfolios', portfoliosRoutes);
router.use('/utilities', utilitiesRoutes);

export default router;
