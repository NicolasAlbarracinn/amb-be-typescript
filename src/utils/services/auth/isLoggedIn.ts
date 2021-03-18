import { Request } from 'express';

export const isLoggedIn = (req: Request) => !!req.session!.userId;
