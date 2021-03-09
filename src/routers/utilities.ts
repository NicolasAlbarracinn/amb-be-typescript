import { Router } from 'express';
import { generatePDFfile, generateFileFromRequest } from '../controllers/pdfTemplateController';

const utilitiesRoutes = Router();

utilitiesRoutes.get('/:benefitId', generatePDFfile);
utilitiesRoutes.post('/generateFile', generateFileFromRequest);

export default utilitiesRoutes;
