import { Router } from 'express';
import { getLenderData, createBenefit } from '../controllers/lendersController';
// import { protect } from '../middleware/validateUser';

const externalRoutes = Router();

// externalRoutes.use(protect);
externalRoutes.post('/', createBenefit);
externalRoutes.get('/:cuit', getLenderData);

export default externalRoutes;
