import { Router } from 'express';
import { generatePDFfile } from '../controllers/pdfTemplateController';

const utilitiesRoutes = Router();

utilitiesRoutes.get('/', generatePDFfile);

export default utilitiesRoutes;
