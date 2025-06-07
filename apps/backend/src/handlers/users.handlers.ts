import { RequestHandler } from 'express';

export const createUserHandler: RequestHandler = (req, res, next) => {
  res.json({ message: 'User has been successfully created' });
};
