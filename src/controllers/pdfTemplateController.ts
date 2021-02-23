import { RequestHandler } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';

import { completeTemplate } from '../utils/services/pdf/templateParser';
import { templateNames } from '../utils/services/pdf/templatesLoader';
import { generatePDF } from '../utils/services/pdf/pdfManager';

const generatePdfFromRequest: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    return next(new AppError('datos no proporcionado', 404));
  }
  const { partnerDetail, benefitDetail, distributionDetail } = req.body;

  const templateDate = { ...partnerDetail, ...benefitDetail, ...distributionDetail };

  //FIX: pdf styles
  const completedTemplate = await completeTemplate(templateDate, templateNames.FILE_NINE_MAY);
  const bufferPdf = await generatePDF(completedTemplate);

  res.setHeader('Content-Disposition', 'attachment; filename=panda.pdf');
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Content-Type', 'application/pdf');
  res.status(200).send(bufferPdf);
};

export const generatePDFfile = catchAsync(generatePdfFromRequest);
