import { Router } from 'express';
import { protect } from '../middleware/validateUser';
import { login, logout, profile, updateProfile } from '../controllers/userControllers';

const userRoutes = Router();

userRoutes.post('/login', login);
userRoutes.get('/logout', logout);

userRoutes.use(protect);
userRoutes.post('/profile', profile);
userRoutes.patch('/profile/edit', updateProfile);

export default userRoutes;
