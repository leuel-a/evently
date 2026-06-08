import httpStatus from 'http-status';
import {RequestHandler} from 'express';
import EventsModel from '../models/events';
import TicketsModel from '../models/tickets';

export const getDashboardStatsHandler: RequestHandler = async (_req, res, _next) => {
    const user = res.locals.user;
    const eventsStats = await EventsModel.getEventStats({userId: user.id});
    const ticketsRevenueByMonth = await TicketsModel.getTicketsRevenueByMonthAndYear({});

    res.status(httpStatus.OK).json({data: {...eventsStats.data, ticketsRevenueByMonth: ticketsRevenueByMonth.data}});
};
