import { RequestHandler } from 'express';

import catchAsync from '../utils/catchAsync';
import { completeTemplate } from '../utils/services/pdf/templateParser';
import { templateNames } from '../utils/services/pdf/templatesLoader';
import { generatePDFStream } from '../utils/services/pdf/pdfManager';

const generatePdfFromRequest: RequestHandler = async (req, res, next) => {
  //FIX: pdf styles
  const completedTemplate = await completeTemplate({}, templateNames.FILE_NINE_MAY);
  const pdfFile = await generatePDFStream(completedTemplate);

  res.set('Content-type', 'application/pdf');

  pdfFile.pipe(res);

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       file: base64Encode,
  //     },
  //   });
};

export const generatePDFfile = catchAsync(generatePdfFromRequest);
