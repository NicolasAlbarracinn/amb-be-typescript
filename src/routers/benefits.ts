import { Router } from 'express';
import { protect } from '../middleware/validateUser';
import { parnetInfo, createBenefit } from '../controllers/benefitsController';

const benefitsRoutes = Router();

benefitsRoutes.use(protect);

benefitsRoutes.get('/:partnerId', parnetInfo);
benefitsRoutes.post('/', createBenefit);

export default benefitsRoutes;
