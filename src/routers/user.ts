import { Router } from 'express';

const userRoutes = Router();
//TODO controllers
userRoutes.post('/', (req, res) => {
  res.send('user');
});
userRoutes.post('/login', (req, res) => {
  res.send('user');
});
userRoutes.get('/logout', (req, res) => {
  res.send('user');
});

userRoutes.post('/profile', (req, res) => {
  res.send('user');
});
userRoutes.patch('/profile/edit', (req, res) => {
  res.send('user');
});

export default userRoutes;
