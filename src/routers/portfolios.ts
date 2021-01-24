import { Router } from 'express';
import { createPortfolio, getLendersList } from '../controllers/portfoliosControllers';
import { protect } from '../middleware/validateUser';

const externalRoutes = Router();

externalRoutes.use(protect);
externalRoutes.post('/', createPortfolio);
externalRoutes.get('/lenders', getLendersList);

export default externalRoutes;
