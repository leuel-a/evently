import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { HTTP_STATUS } from '@/constants/statusCodes';
import AppError, { ERROR_ENUM } from '@/models/AppError';
import UsersModel from '@/models/Users';

export const createUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth } = req.body;

    const user = await UsersModel.createUser({ email, password, firstName, lastName, dateOfBirth });

    res.status(HTTP_STATUS.CREATED).json({ data: user });
  } catch (error) {
    if (error instanceof AppError) {
      next(createHttpError(HTTP_STATUS.BAD_REQUEST, error.enum));
    }
    next(createHttpError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_ENUM.INTERNAL_SERVER_ERROR));
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
