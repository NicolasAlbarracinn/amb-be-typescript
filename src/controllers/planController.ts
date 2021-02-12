import { RequestHandler } from 'express';
import { isEmpty } from 'lodash';
import { Types } from 'mongoose';

import Plan from '../db/models/plan';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';

const getPlanList: RequestHandler = async (req, res, next) => {
  const { portfolioTypes } = req.params;

  if (!portfolioTypes) {
    return next(new AppError('Typo de cartera no proporcionado', 404));
  }

  const planList = await Plan.find().where('portfolioTypes').equals(portfolioTypes);
  res.status(200).json({
    status: 'success',
    data: planList,
  });
};

const getPlanByID: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  console.log('planID');
  if (!id) {
    return next(new AppError('id no proporcionado', 404));
  }

  const plan = await Plan.find({ _id: Types.ObjectId(id) });

  if (!plan || isEmpty(plan)) {
    return next(new AppError(`El plan con id: ${id} no existe`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: plan[0],
  });
};

export const findPlanById = catchAsync(getPlanByID);
export const findPlanList = catchAsync(getPlanList);
