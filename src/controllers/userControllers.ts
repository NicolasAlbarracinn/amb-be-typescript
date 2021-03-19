import { RequestHandler } from 'express';
import crypto from 'crypto';
import User from '../db/models/user';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/errorHandler';
import { logIn } from '../utils/services/auth/login';
import { logout as logoutUser } from '../utils/services/auth/logout';
import { sendEmail } from '../utils/services/mail';
import { generateResetURL } from '../utils/generateResetURL';

const loginFunction: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide credentials', 400));
  }

  const user = await User.findByCredentials(req.body.email, req.body.password);

  logIn(req, user._id || '');

  res.status(201).json({
    status: 'success',
    user,
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

const registerUser: RequestHandler = async (req, res, next) => {
  const { email } = req.body;

  const found = await User.exists({ email });

  if (found) {
    return next(new AppError('Email existente', 401));
  }

  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  logIn(req, user.id);

  res.status(201).json({
    status: 'success',
    user,
  });
};

const forgotPasswordUser: RequestHandler = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError('El email proporcionado no exite', 404));

  const resetToken = user.refreshPasswordToken();

  await user.save({ validateBeforeSave: false });

  try {
    sendEmail({
      to: user.email,
      subject: 'reset password',
      text: `forgot pass: enter here ${generateResetURL(resetToken, user._id)}`,
    });

    res.status(200).json({
      status: 'success',
      message: `Token enviado al email ${user.email}`,
    });
  } catch (err) {
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new AppError('No pudimos enviar el email, por favor intente mas tarde', 404));
  }
};

export const resetUserPassword: RequestHandler = async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now().toString() },
  });

  if (!user) return next(new AppError('Token invalido', 400));

  user.password = req.body.password;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  await user.save();

  logIn(req, user.id);

  res.status(200).json({
    status: 'success',
  });
};

export const login = catchAsync(loginFunction);
export const logout = catchAsync(logoutFunction);
export const registration = catchAsync(registerUser);
export const profile = catchAsync(profileFunction);
export const updateProfile = catchAsync(updateProfileFunction);
export const forgotPassword = catchAsync(forgotPasswordUser);
export const resetPassword = catchAsync(resetUserPassword);
