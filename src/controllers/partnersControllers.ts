import { RequestHandler } from 'express';
import Partners from '../db/models/partner';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';
import { getValueForNextSequence } from '../utils/sequenceValues';

const partnerDetailsFunction: RequestHandler = async (req, res, next) => {
  const data = await Partners.findOne({ partnerId: Number(req.params.partnerId) });

  if (!data) {
    return next(new AppError('El socio no existe', 404));
  }

  res.status(200).json({
    status: 'success',
    data,
  });
};

const partnersFunction: RequestHandler = async (req, res, next) => {
  const { sortField, sortCriteria, limit, offset } = req.query;

  const query = [];

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
  ] = await Partners.aggregate(query);

  if (!data) {
    return next(new AppError('No partners list', 400));
  }

  res.status(200).json({
    status: 'success',
    count,
    data,
  });
};

const savePartnerFunction: RequestHandler = async (req, res) => {
  console.log(req.body);
  const newPartnerId = await getValueForNextSequence(Partners, 'partnerId');
  const partner = new Partners({
    ...req.body,
    partnerId: newPartnerId,
    createdBy: req.user?._id || '',
  });
  await partner.save();

  res.status(200).json({
    status: 'success',
    data: { partnerId: newPartnerId },
  });
};

const updatePartnerFunction: RequestHandler = async (req, res) => {
  const updatedPartner = await Partners.findOneAndUpdate(
    { partnerId: req.body.partnerId },
    {
      ...req.body.data,
      modifiedBy: req.user?._id,
    },
    { new: true },
  ).exec();

  res.status(200).json({
    status: 'success',
    data: updatedPartner,
  });
};

const updatePartnerStatusFunction: RequestHandler = async (req, res) => {
  const updatedPartner = await Partners.findOneAndUpdate(
    { partnerId: req.body.partnerId },
    {
      status: req.body.status,
      modifiedBy: req.user?._id,
    },
    { new: true },
  ).exec();

  res.status(200).json({
    status: 'success',
    data: updatedPartner,
  });
};

export const partnerDetails = catchAsync(partnerDetailsFunction);
export const partners = catchAsync(partnersFunction);
export const savePartner = catchAsync(savePartnerFunction);
export const updatePartner = catchAsync(updatePartnerFunction);
export const updatePartnerStatus = catchAsync(updatePartnerStatusFunction);
