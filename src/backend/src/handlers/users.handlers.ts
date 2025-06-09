import { RequestHandler } from 'express';

import { HTTP_STATUS } from '@/constants/statusCodes';
import UsersModel from '@/models/Users';

export const createUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth } = req.body;

    const user = await UsersModel.createUser({ email, password, firstName, lastName, dateOfBirth });

    res.status(HTTP_STATUS.CREATED).json({ data: user });
  } catch (e) {
    next(e);
  }
};

export const getUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.getUser(id);
    res.status(HTTP_STATUS.OK).json({ data: user });
  } catch (e) {
    next(e);
  }
};

export const getUsersHandler: RequestHandler = (_req, res) => {
  res.status(HTTP_STATUS.OK).json({ message: 'Get many users successfully' });
};
