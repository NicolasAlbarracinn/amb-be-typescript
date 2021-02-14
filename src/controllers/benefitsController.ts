import { Types } from 'mongoose';
import { RequestHandler, RequestParamHandler } from 'express';

import Benefits from '../db/models/benefit';
import Partners from '../db/models/partner';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';
import { getValueForNextSequence } from '../utils/sequenceValues';

const createBenefitFunction: RequestHandler = async (req, res) => {
  const newBenefitsId = await getValueForNextSequence(Benefits, 'benefitId');

  const benefit = new Benefits({
    ...req.body,
    benefitId: newBenefitsId,
    createdBy: req.user?._id,
  });

  await benefit.save();

  res.status(200).json({
    status: 'success',
    data: { benefitId: newBenefitsId },
  });
};

const selectFields =
  'modifiedBy createdAt createdBy status workInfo.repartition workInfo.fileNumber workInfo.fileItem  workInfo.bankName workInfo.cbu workInfo.bankBranchName workInfo.bankAccountNumber personalData.recoveryPaymentType personalData.paymentType personalData.documentType personalData.documentNumber personalData.gender personalData.cuil personalData.name personalData.lastName personalData.civilState personalData.email';

const parnetInfoFunction: RequestHandler = async (req, res, next) => {
  if (!req.params.partnerId) {
    return next(new AppError('numero de socio no proporcionado', 404));
  }
  const query = Partners.findOne({ partnerId: Number(req.params.partnerId) }).select(selectFields);

  const data = await query
    .populate({ path: 'createdBy', select: 'firstName lastName _id' })
    .populate({ path: 'modifiedBy', select: 'firstName lastName _id' });

  if (!data) {
    return next(new AppError('El socio no existe', 404));
  }

  res.status(200).json({
    status: 'success',
    data,
  });
};

const getBenefitsList: RequestParamHandler = async (req, res, next) => {
  const { sortField, sortCriteria, limit, offset } = req.query;

  const query = [];

  query.push({ $project: { benefitId: 1, portfolio: 1, benefitStatus: 1 } });

  if (sortField && sortCriteria) {
    query.push({ $sort: { [sortField as string]: sortCriteria === 'asc' ? 1 : -1 } });
  }

  query.push({
    $facet: {
      metadata: [{ $count: 'count' }],
      data: [{ $skip: parseInt(offset as string) }, { $limit: parseInt(limit as string) }], // add projection here wish you re-shape the docs
    },
  });

  const [
    {
      data,
      metadata: [{ count }],
    },
  ] = await Benefits.aggregate(query);

  if (!data) {
    return next(new AppError('aun no se a cargado ninguna prestacion en el sistema', 400));
  }

  res.status(200).json({
    status: 'success',
    count,
    data,
  });
};

const getBenefitDetail: RequestParamHandler = async (req, res, next) => {
  if (!req.params.benefitID) {
    return next(new AppError('numero de prestacion no proporcionado', 404));
  }

  const data = await Benefits.findOne({ _id: Types.ObjectId(req.params.benefitID) });

  if (!data) {
    return next(new AppError('No se a encotrado prestacion para el id proporcionado', 400));
  }

  res.status(200).json({
    status: 'success',
    data,
  });
};

export const createBenefit = catchAsync(createBenefitFunction);
export const parnetInfo = catchAsync(parnetInfoFunction);
export const benefitList = catchAsync(getBenefitsList);
export const benefitDetail = catchAsync(getBenefitDetail);
