import express, { Request } from 'express';
import cors from 'cors';

import routes from './routers/index';
import AppError from './utils/errorHandler';
import { createSession } from './utils/createSession';
import { errorRequestHandler } from './middleware/errorRequestHandler';
import { activeSession } from './middleware/authorization';

const app = express();

app.use(cors<Request>());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(createSession());
app.use(activeSession);

app.use('/api', routes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Handle Error
app.use(errorRequestHandler);

export default app;
