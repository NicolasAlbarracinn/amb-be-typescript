import express, { Request } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import routes from './routers/index';
import AppError from './utils/errorHandler';
import { errorRequestHandler } from './middleware/errorRequestHandler';

const app = express();

app.use(cors<Request>());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Handle Error
app.use(errorRequestHandler);

export default app;
