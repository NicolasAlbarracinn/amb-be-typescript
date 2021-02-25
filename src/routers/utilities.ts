import { Router } from 'express';
import { generatePDFfile } from '../controllers/pdfTemplateController';

const utilitiesRoutes = Router();

utilitiesRoutes.get('/:benefitId', generatePDFfile);

export default utilitiesRoutes;
