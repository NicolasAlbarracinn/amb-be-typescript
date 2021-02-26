import { RequestHandler } from 'express';

import Benefits from '../db/models/benefit';
import { IBenefitDoc } from '../db/models/benefit/types';

import Portfolios from '../db/models/portfolio';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';

import { completeTemplate } from '../utils/services/pdf/templateParser';
import { templateNames } from '../utils/services/pdf/templatesLoader';
import { generatePDF } from '../utils/services/pdf/pdfManager';
import { IPartnerDoc } from '../db/models/partner/types';
import { IPlanDoc } from '../db/models/plan/types';

import {
  CivilStateList,
  StatusList,
  BenefitTypeList,
  PortfoliosList,
  DocumentTypeList,
  BenefitStatusList,
  PaymentType,
} from '../utils/constants';

const parseTemplateData = async (data: IBenefitDoc) => {
  const templateData = data.toObject();
  const partner = templateData.partner as IPartnerDoc;
  const plan = templateData.plan as IPlanDoc;

  const portfolioData = await Portfolios.findOne({ lender: plan.lender }).select(
    'nominalAnulRate anualCashRate financialTotal monthlyCashRate administrativeExpense cancellationExpense -_id',
  );

  return {
    ...partner.personalData,
    ...partner.adress,
    ...partner.workInfo,
    nominalAnulRate: portfolioData?.nominalAnulRate || '0',
    anualCashRate: portfolioData?.anualCashRate || '0',
    financialTotal: portfolioData?.financialTotal || '0',
    monthlyCashRate: portfolioData?.monthlyCashRate || '0',
    administrativeExpense: portfolioData?.administrativeExpense || '0',
    cancellationExpense: portfolioData?.cancellationExpense || '0',
    documentType: DocumentTypeList[partner.personalData.documentType],
    civilState: CivilStateList[partner.personalData.civilState],
    partnerStatus: StatusList[partner.status],
    partnerId: partner.partnerId,
    plan: plan.plan,
    portfolioTypes: PortfoliosList[plan.portfolioTypes],
    benefitType: BenefitTypeList[templateData.benefitType],
    certificateNumber: templateData.certificateNumber,
    applicationDate: templateData.applicationDate,
    portfolio: templateData.portfolio,
    signatureAmount: templateData.signatureAmount,
    duesQuantity: templateData.duesQuantity,
    duesAmount: templateData.duesAmount,
    amountGranted: templateData.amountGranted,
    observations: templateData.observations,
    benefitStatus: BenefitStatusList[templateData.benefitStatus],
    grantedPeriod: templateData.grantedPeriod,
    statusDate: templateData.statusDate,
    paymentMethod: PaymentType[templateData.paymentMethod],
    paymentMethodRecovery: PaymentType[templateData.paymentMethodRecovery],
    benefitId: templateData.benefitId,
  };
};

const generatePdfFromRequest: RequestHandler = async (req, res, next) => {
  if (!req.params.benefitId) {
    return next(new AppError('datos no proporcionado', 404));
  }
  const benefit = await Benefits.findOne({ benefitId: parseInt(req.params.benefitId) })
    .populate({ path: 'partner' })
    .populate({ path: 'plan' });

  if (!benefit) {
    return next(new AppError('prestacion inexistente', 404));
  }

  const templateData = await parseTemplateData(benefit);

  //FIX: pdf styles
  const completedTemplate = await completeTemplate(templateData, templateNames.FILE_NINE_MAY);
  const bufferPdf = await generatePDF(completedTemplate);

  res.setHeader('Content-Disposition', 'attachment; filename=panda.pdf');
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Content-Type', 'application/pdf');
  res.status(200).send(bufferPdf);
};

export const generatePDFfile = catchAsync(generatePdfFromRequest);
