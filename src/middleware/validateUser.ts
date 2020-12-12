import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/models/user';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';

const protectedRoute: RequestHandler = async (req, res, next) => {
  const headerHasToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer');
  const token = headerHasToken ? req.headers.authorization?.split(' ')[1] : req.cookies ? req.cookies.jwt : undefined;

  if (!token) {
    return next(new AppError('Not Logged in, please login', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { _id: string };

  const user = await User.findOne({ _id: decoded._id });

  if (!user) {
    return next(new AppError('The user does not exist', 401));
  }

  req.token = token;
  req.user = user;

  next();
};

export const protect = catchAsync(protectedRoute);

//TODO: add validation middleware for user roles
