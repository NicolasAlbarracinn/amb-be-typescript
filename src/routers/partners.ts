import { Router } from 'express';
import { partners, updatePartner, updatePartnerStatus, savePartner } from '../controllers/partnersControllers';

const partnerRoutes = Router();

partnerRoutes.route('/').get(partners).post(savePartner).patch(updatePartner);
partnerRoutes.patch('/updateStatus', updatePartnerStatus);

export default partnerRoutes;
