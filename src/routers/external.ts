import { Router } from 'express';
import { veraz } from '../controllers/verazControllers';
// import { protect } from '../middleware/validateUser';

const externalRoutes = Router();

// externalRoutes.use(protect);
externalRoutes.post('/veraz', veraz);

export default externalRoutes;
