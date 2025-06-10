import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { HTTP_STATUS } from '@/constants/statusCodes';
import type { IBaseUser } from '@/models/Users/types';
import { signJwt } from '@/utils/jwt';

export const loginHandler: RequestHandler = (req, res, next) => {
  const user = req.user as (IBaseUser & { id: string }) | undefined;

  if (!user) {
    return next(createHttpError(HTTP_STATUS.UNAUTHORIZED, 'Invalid Email or Password'));
  }

  const accessToken = signJwt({ id: user.id, email: user.email }, { expiresIn: '1h' });
  res.status(200).json({ id: user.id, email: user.email, accessToken });
};
