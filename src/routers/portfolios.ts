import { Router } from 'express';
import { createPortfolio, getLendersList } from '../controllers/portfoliosControllers';

const portfolioRoutes = Router();

portfolioRoutes.post('/', createPortfolio);
portfolioRoutes.get('/lenders', getLendersList);

export default portfolioRoutes;
