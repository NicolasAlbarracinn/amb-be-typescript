import { Router } from 'express';

const extenarlRoutes = Router();
//TODO controllers
extenarlRoutes.get('/renaper', (req, res) => {
  res.send('external');
});

export default extenarlRoutes;
