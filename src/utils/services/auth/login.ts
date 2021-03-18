import { Request } from 'express';

export const logIn = (req: Request, userId: string) => {
  req.session!.userId = userId;
  req.session!.createdAt = Date.now();
};
