//crear nuevo
//get afip data

import { RequestHandler } from 'express';

import Portfolios from '../db/models/portfolio';
import Lenders from '../db/models/lender';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';

const createPorfolioFunction: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    return next(new AppError('datos incompletos', 404));
  }
  const lender = new Portfolios({
    ...req.body,
  });

  await lender.save();

  res.status(200).json({
    status: 'success',
  });
};

const getLenderNamesList: RequestHandler = async (req, res, next) => {
  const result = await Lenders.find().select('id lenderName');

  if (!result) {
    return next(new AppError('No existen fondeadores en el sistema', 404));
  }

  res.status(200).json({
    status: 'success',
    data: result,
  });
};

export const createPortfolio = catchAsync(createPorfolioFunction);
export const getLendersList = catchAsync(getLenderNamesList);
