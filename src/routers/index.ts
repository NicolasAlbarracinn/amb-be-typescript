import { Router } from 'express';

import userRoutes from './user';
import externalRoutes from './external';
import partnersRoutes from './partners';
import benefitsRoutes from './benefits';

const router = Router();

router.use('/user', userRoutes);
router.use('/externals', externalRoutes);
router.use('/partners', partnersRoutes);
router.use('/benefits', benefitsRoutes);

export default router;
