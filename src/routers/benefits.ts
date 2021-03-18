import { Router } from 'express';
import { parnetInfo, createBenefit } from '../controllers/benefitsController';

const benefitsRoutes = Router();

benefitsRoutes.get('/:partnerId', parnetInfo);
benefitsRoutes.post('/', createBenefit);

export default benefitsRoutes;
