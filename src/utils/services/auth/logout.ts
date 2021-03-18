import { Request, Response } from 'express';
import { SESSION_NAME } from '../../../config';

export const logout = (req: Request, res: Response) =>
  new Promise<void>((resolve, reject) => {
    req.session!.destroy((err: Error) => {
      if (err) reject(err);

      res.clearCookie(SESSION_NAME);

      resolve();
    });
  });
