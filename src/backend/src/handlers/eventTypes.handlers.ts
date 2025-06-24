import type {RequestHandler} from 'express';
import {HTTP_STATUS} from '@/constants/statusCodes';
import EventTypeModel from '@/models/EventTypes';
import {createApiError} from '@/utils';
import {removeMongoFields} from '@/utils/transform';

export const createEventTypeHandler: RequestHandler = async (req, res, next) => {
  try {
    const {name} = req.body;
    const eventType = await EventTypeModel.createEventType({name});

    res.status(HTTP_STATUS.CREATED).json({data: removeMongoFields(eventType)});
  } catch (error) {
    next(createApiError(error));
  }
};

export const getEventTypeHandler: RequestHandler = async (req, res, next) => {
  try {
    const {id} = req.params;
    const eventType = await EventTypeModel.getEventType(id);

    res.status(HTTP_STATUS.OK).json({data: removeMongoFields(eventType)});
  } catch (error) {
    next(createApiError(error));
  }
};

export const getEventTypesHandler: RequestHandler = async (_req, res, next) => {
  try {
    const [eventTypes, total] = await Promise.all([
      EventTypeModel.getEventTypes(),
      EventTypeModel.countDocuments({}),
    ]);

    res.status(HTTP_STATUS.OK).json({data: removeMongoFields(eventTypes), total});
  } catch (error) {
    next(createApiError(error));
  }
};
