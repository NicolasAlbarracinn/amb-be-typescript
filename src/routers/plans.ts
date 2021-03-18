import { Router } from 'express';
import { findPlanById, findPlanList } from '../controllers/planController';

const portfolioRoutes = Router();

portfolioRoutes.get('/:id', findPlanById);
portfolioRoutes.get('/list/:portfolioTypes', findPlanList);

export default portfolioRoutes;
