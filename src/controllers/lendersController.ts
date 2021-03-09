//crear nuevo
//get afip data

import { RequestHandler } from 'express';

import Lenders from '../db/models/lender';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';

import { lenderData } from './mockedLenderData';

const createLenderFunction: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    return next(new AppError('datos incompletos', 404));
  }

  console.log(req.body);

  const lender = new Lenders({
    ...req.body,
  });

  await lender.save();

  res.status(200).json({
    status: 'success',
    data: {
      name: req.body.lenderName,
    },
  });
};

const getAfipLenderData: RequestHandler = async (req, res, next) => {
  if (!req.params.cuit) {
    return next(new AppError('cuit no prorcionado', 404));
  }
  //TODO: Call afip web server
  res.status(200).json({
    status: 'success',
    data: lenderData,
  });
};

export const createLender = catchAsync(createLenderFunction);
export const getLenderData = catchAsync(getAfipLenderData);
