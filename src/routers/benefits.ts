import { Router } from 'express';
import { protect } from '../middleware/validateUser';
import {
  parnetInfo,
  createBenefit,
  benefitDetail,
  benefitList,
  benefitDeleteRecord,
  benefitUdateStatus,
  benefitUpdateRecord,
} from '../controllers/benefitsController';

const benefitsRoutes = Router();

benefitsRoutes.use(protect);

//GET RECORD
benefitsRoutes.get('/list', benefitList);
benefitsRoutes.get('/:partnerId', parnetInfo);
benefitsRoutes.get('/detail/:benefitID', benefitDetail);

//CREATE RECORD
benefitsRoutes.post('/', createBenefit);

//UPDATE RECORD
benefitsRoutes.patch('/:benefitID', benefitUpdateRecord);
benefitsRoutes.patch('/status/:benefitID', benefitUdateStatus);

//DELETE RECORD
benefitsRoutes.delete('/:benefitID', benefitDeleteRecord);

export default benefitsRoutes;
