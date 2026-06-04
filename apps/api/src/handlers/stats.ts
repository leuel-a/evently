import httpStatus from 'http-status';
import {RequestHandler} from 'express';
import EventsModel from '../models/events';

export const getDashboardStatsHandler: RequestHandler = async (_req, res, _next) => {
    const user = res.locals.user;
    const result = await EventsModel.getEventStats({userId: user.id});

    res.status(httpStatus.OK).json(result);
};
