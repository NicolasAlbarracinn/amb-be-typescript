import { RequestHandler } from 'express';
import User from '../db/models/user';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';
import { logIn } from '../utils/services/auth/login';
import { logout as logoutUser } from '../utils/services/auth/logout';

const loginFunction: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide credentials', 400));
  }

  const user = await User.findByCredentials(req.body.email, req.body.password);

  logIn(req, user._id || '');

  const { firstName, lastName, completed, image, role } = user;
  res.status(201).json({
    status: 'success',
    user: {
      email,
      firstName,
      lastName,
      completed,
      image,
      role,
    },
  });
};

const profileFunction: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return next(new AppError('The user does not exist', 401));
  }

  const { email, image, firstName, lastName, completed, role } = req.user;
  res.status(200).json({
    status: 'success',
    user: {
      email,
      firstName,
      lastName,
      completed,
      image,
      role,
    },
  });
};

const updateProfileFunction: RequestHandler = async (req, res, next) => {
  const updatedProfile = { ...req.body, _id: req.user!._id, completed: true };
  const user = await User.findOneAndUpdate({ _id: updatedProfile._id }, updatedProfile, { new: true }).exec();

  if (!user) {
    return next(new AppError('The user does not exist', 401));
  }

  const { email, firstName, lastName, completed, image, role } = user;

  res.status(200).json({
    status: 'success',
    user: {
      email,
      firstName,
      lastName,
      completed,
      image,
      role,
    },
  });
};

const logoutFunction: RequestHandler = async (req, res) => {
  await logoutUser(req, res);
  res.status(200).json({ status: 'success' });
};

export const login = catchAsync(loginFunction);
export const logout = catchAsync(logoutFunction);
export const profile = catchAsync(profileFunction);
export const updateProfile = catchAsync(updateProfileFunction);
