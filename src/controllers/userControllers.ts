import { RequestHandler } from 'express';
import User from '../db/models/user';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';

const loginFunction: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide credentials', 400));
  }

  const user = await User.findByCredentials(req.body.email, req.body.password);

  const token = user.generateAuthToken();

  const cookieTime = process.env.COOKIE_EXPIRATION_TIME || '864000';

  const cookieOptions = {
    expires: new Date(Date.now() + cookieTime),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.cookie('jwt', token, cookieOptions);

  const { firstName, lastName, completed, image, role } = user;
  res.status(201).json({
    status: 'success',
    token,
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

const logoutFunction: RequestHandler = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'success' });
};

export const login = catchAsync(loginFunction);
export const logout = catchAsync(logoutFunction);
export const profile = catchAsync(profileFunction);
export const updateProfile = catchAsync(updateProfileFunction);
