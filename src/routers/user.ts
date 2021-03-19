import { Router } from 'express';
import { protectedRoute, restrictedTo } from '../middleware/authorization';
import {
  login,
  logout,
  profile,
  updateProfile,
  registration,
  forgotPassword,
  resetPassword,
} from '../controllers/userControllers';

const userRoutes = Router();

userRoutes.post('/login', login);
userRoutes.post('/logout', logout);
userRoutes.post('/singup', registration);
userRoutes.post('/forgotPassword', restrictedTo('admin'), forgotPassword);
userRoutes.post('/resetPassword/:token', restrictedTo('admin'), resetPassword);

userRoutes.use(protectedRoute);
userRoutes.post('/profile', profile);
userRoutes.patch('/profile/edit', updateProfile);

export default userRoutes;
