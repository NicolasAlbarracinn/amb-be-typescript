import { RequestHandler, Request, Response, NextFunction } from 'express';
import User from '../db/models/user';
import AppError from '../utils/errorHandler';
import catchAsync from '../utils/catchAsync';
import { isLoggedIn, logout } from '../utils/services/auth';

import { SESSION_ABSOLUTE_TIMEOUT } from '../config';

export const guest: RequestHandler = (req, res, next) => {
  if (isLoggedIn(req)) {
    return next(new AppError('You are already logged in', 400));
  }

  next();
};

export const activeSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session as Express.Session;

    if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
      await logout(req, res);

      return next(new AppError('Session expired', 401));
    }
  }
  next();
});

export const protectedRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    return next(new AppError('Not Logged in, please login', 401));
  }

  const user = await User.findOne({ _id: req.session!.userId });

  if (!user) {
    return next(new AppError('The user does not exist', 401));
  }

  req.user = user;
  next();
});

//TODO: define roles and permisions
export const restrictedTo = (...roles: Array<string>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role!)) {
      return next(new AppError('permisos insuficientes', 403));
    }

    next();
  });
};
