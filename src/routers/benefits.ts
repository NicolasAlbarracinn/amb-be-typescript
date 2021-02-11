import { Router } from 'express';
import { protect } from '../middleware/validateUser';
import { parnetInfo, createBenefit, planList } from '../controllers/benefitsController';

const benefitsRoutes = Router();

benefitsRoutes.get('/planList/:portfolioTypes', planList);

benefitsRoutes.use(protect);

benefitsRoutes.get('/:partnerId', parnetInfo);
benefitsRoutes.post('/', createBenefit);

export default benefitsRoutes;
