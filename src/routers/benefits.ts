import { Router } from 'express';
import { protect } from '../middleware/validateUser';
import { parnetInfo, createBenefit, benefitDetail, benefitList } from '../controllers/benefitsController';

const benefitsRoutes = Router();

benefitsRoutes.use(protect);

benefitsRoutes.get('/:partnerId', parnetInfo);
benefitsRoutes.get('/list', benefitList);
benefitsRoutes.get('/detail/:benefitID', benefitDetail);
benefitsRoutes.post('/', createBenefit);

export default benefitsRoutes;
