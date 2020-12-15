import { Router } from 'express';
import { protect } from '../middleware/validateUser';
import { partners, updatePartner, updatePartnerStatus, savePartner } from '../controllers/partnersControllers';

const partnerRoutes = Router();

partnerRoutes.use(protect);
partnerRoutes.route('/').get(partners).post(savePartner).patch(updatePartner);
partnerRoutes.patch('/updateStatus', updatePartnerStatus);

export default partnerRoutes;
