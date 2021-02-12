import { Router } from 'express';
import { findPlanById, findPlanList } from '../controllers/planController';
import { protect } from '../middleware/validateUser';

const portfolioRoutes = Router();

portfolioRoutes.use(protect);
portfolioRoutes.get('/:id', findPlanById);
portfolioRoutes.get('/list/:portfolioTypes', findPlanList);

export default portfolioRoutes;
