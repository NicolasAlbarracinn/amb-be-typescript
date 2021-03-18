import session from 'express-session';
import MongoStore from 'connect-mongo';

import { MONGO_URI, MONGO_DATABASE, SESSION_OPTIONS } from '../config';

export const createSession = () => {
  const store = MongoStore.create({
    mongoUrl: MONGO_URI,
    dbName: MONGO_DATABASE,
  });

  return session({
    ...SESSION_OPTIONS,
    store,
  });
};
