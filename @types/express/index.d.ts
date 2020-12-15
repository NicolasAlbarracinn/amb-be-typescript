export {};

declare global {
  namespace Express {
    export interface Request {
      token?: string;
      user?: import('../../src/db/models/user/types').IUserDoc;
    }
  }
}
