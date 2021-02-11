//crear nuevo
//get afip data

import { RequestHandler } from 'express';

import Portfolios from '../db/models/portfolio';
import Lenders from '../db/models/lender';
import { IPlan } from '../db/models/plan/types';
import Plan from '../db/models/plan';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';
import { getValueForNextSequence } from 'utils/sequenceValues';

const parseRespose = (portfolio: Record<string, unknown>, portfolioTypes: string): IPlan[] => {
  const parsedPlans: IPlan[] = [];
  Object.keys(portfolio)
    .filter(k => k !== 'isValid')
    .forEach(k => {
      parsedPlans.push({ ...(portfolio[k] as IPlan), portfolioTypes } as IPlan);
    });

  return parsedPlans;
};

const createPorfolioFunction: RequestHandler = async (req, res, next) => {
  const planId = await getValueForNextSequence(Portfolios, 'planId');
  if (!req.body) {
    return next(new AppError('datos incompletos', 404));
  }
  const parsedPlan = parseRespose(req.body.plans, req.body.portfolioTypes);

  const planList = await Plan.insertMany(parsedPlan as Array<IPlan>);

  const plans = planList.map(i => i._id);
  const lender = new Portfolios({
    ...req.body,
    plans,
    planId,
  });

  await lender.save();

  res.status(200).json({
    status: 'success',
    data: { planId },
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
