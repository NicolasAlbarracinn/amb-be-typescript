import { Router } from 'express';
import { getLenderData, createLender } from '../controllers/lendersController';
import { protect } from '../middleware/validateUser';

const externalRoutes = Router();

externalRoutes.use(protect);
externalRoutes.post('/', createLender);
externalRoutes.get('/:cuit', getLenderData);

export default externalRoutes;
