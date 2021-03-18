import { Router } from 'express';
import { protectedRoute } from '../middleware/authorization';
import { login, logout, profile, updateProfile } from '../controllers/userControllers';

const userRoutes = Router();

userRoutes.post('/login', login);
userRoutes.post('/logout', logout);

userRoutes.use(protectedRoute);
userRoutes.post('/profile', profile);
userRoutes.patch('/profile/edit', updateProfile);

export default userRoutes;
