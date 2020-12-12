import express from 'express';
import routes from './routers/index';

const app = express();

routes(app);

export default app;
