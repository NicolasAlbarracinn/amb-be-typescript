import { Router } from 'express';
import { protectedRoute } from '../middleware/authorization';
import { login, logout, profile, updateProfile, registration } from '../controllers/userControllers';

const userRoutes = Router();

userRoutes.post('/login', login);
userRoutes.post('/logout', logout);
userRoutes.post('/singup', registration);

userRoutes.use(protectedRoute);
userRoutes.post('/profile', profile);
userRoutes.patch('/profile/edit', updateProfile);

export default userRoutes;
