import type { RequestHandler } from 'express';
import { HTTP_STATUS } from '@/constants/statusCodes';
import { ApiError } from '@/models/ApiError';
import { ERROR_ENUM } from '@/models/AppError';
import EventsModel from '@/models/Events';
import type { IBaseUser } from '@/models/Users/types';
import { convertToObjectId, createApiError } from '@/utils/index';

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
      createdBy: convertToObjectId(user.id),
    });

    res.status(HTTP_STATUS.CREATED).json({ data: event });
  } catch (error) {
    console.log(error);
    next(createApiError(error));
  }
};

export const getEventHandler: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await EventsModel.getEvent(id);

    if (!event) {
      throw new ApiError('Event not found', HTTP_STATUS.NOT_FOUND, ERROR_ENUM.RESOURCE_NOT_FOUND);
    }

    res.status(HTTP_STATUS.OK).json({ data: event });
  } catch (error) {
    next(createApiError(error));
  }
};

export const getEventsHandler: RequestHandler = async (_req, res, next) => {
  try {
    // TODO: if the user has been authenticated, and the dashboard param is
    // set in the query parameters list return the events that the user has created

    // TODO: add ability to create pages, and pagesize for the returned data
    // NOTE: this needs to be in the way that react admin wants the data to be returned
    const [events, total] = await Promise.all([
      EventsModel.getEvents(),
      EventsModel.countDocuments(),
    ]);

    res.status(HTTP_STATUS.OK).json({ data: events, total });
  } catch (error) {
    next(createApiError(error));
  }
};
