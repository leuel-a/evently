import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { HTTP_STATUS } from '@/constants/statusCodes';
import AppError, { ERROR_ENUM } from '@/models/AppError';
import UsersModel from '@/models/Users';
import { createApiError } from '@/utils/index';
import { removeMongoFields } from '@/utils/transform';

export const createUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth } = req.body;
    const user = await UsersModel.createUser({ email, password, firstName, lastName, dateOfBirth });

    res.status(HTTP_STATUS.CREATED).json({ data: removeMongoFields(user) });
  } catch (error) {
    next(createApiError(error));
  }
};

export const getUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.getUser(id);
    res.status(HTTP_STATUS.OK).json({ data: user });
  } catch (error) {
    next(createApiError(error));
  }
};

export const getUsersHandler: RequestHandler = (_req, res) => {
  res.status(HTTP_STATUS.OK).json({ message: 'Get many users successfully' });
};
