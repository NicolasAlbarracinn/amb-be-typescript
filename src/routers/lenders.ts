import { Router } from 'express';
import { getLenderData, createLender } from '../controllers/lendersController';

const externalRoutes = Router();

externalRoutes.post('/', createLender);
externalRoutes.get('/:cuit', getLenderData);

export default externalRoutes;
