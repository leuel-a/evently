import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { HTTP_STATUS } from '@/constants/statusCodes';
import { AppError, ERROR_ENUM } from '@/models/AppError';
import EventsModel from '@/models/Events';
import type { IBaseUser } from '@/models/Users/types';

export const createEventHandler: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, startDate, endDate, capacity } = req.body;
    const user = req.user as IBaseUser & { id: string };

    const event = await EventsModel.createEvent({
      title,
      description,
      startDate,
      endDate,
      capacity,
      createdBy: user.id,
    });

    res.status(HTTP_STATUS.CREATED).json({ data: event });
  } catch (error) {
    if (error instanceof AppError) {
      next(createHttpError(HTTP_STATUS.BAD_REQUEST, error.enum));
    }
    next(createHttpError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_ENUM.INTERNAL_SERVER_ERROR));
  }
};

export const getEventHandler: RequestHandler = (req, res, next) => {
  res.status(200).json({ message: 'Get Single Event' });
};
