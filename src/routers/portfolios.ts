import { Router } from 'express';
import { createPortfolio, getLendersList } from '../controllers/portfoliosControllers';
import { protect } from '../middleware/validateUser';

const portfolioRoutes = Router();

portfolioRoutes.use(protect);
portfolioRoutes.post('/', createPortfolio);
portfolioRoutes.get('/lenders', getLendersList);

export default portfolioRoutes;
