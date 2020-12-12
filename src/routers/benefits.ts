import { Router } from 'express';

const benefitsRoutes = Router();
//TODO controllers
benefitsRoutes.get('/:partnerId', (req, res) => {
  res.send('benefits');
});
benefitsRoutes.post('', (req, res) => {
  res.send('benefits');
});

export default benefitsRoutes;
