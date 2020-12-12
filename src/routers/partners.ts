import { Router } from 'express';

const partnerRoutes = Router();
//TODO controllers
partnerRoutes
  .route('/')
  .get((req, res) => {
    console.log('kdask');
    res.send('partners');
  })
  .post((req, res) => {
    res.send('partners');
  })
  .patch((req, res) => {
    res.send('partners');
  });

partnerRoutes.patch('/updateStatus', (req, res) => {
  res.send('partners');
});

export default partnerRoutes;
