import { Router } from 'express';
import { veraz } from '../controllers/verazControllers';

const externalRoutes = Router();

externalRoutes.get('/veraz', veraz);

export default externalRoutes;
