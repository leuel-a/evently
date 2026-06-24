import httpStatus from 'http-status';
import {RequestHandler} from 'express';
import EventsModel from '../../models/events';
import TicketsModel from '../../models/tickets';

export const getDashboardStatsHandler: RequestHandler = async (_req, res, _next) => {
    const user = res.locals.user;
    const [eventsStats, ticketsStats] = await Promise.all([
        EventsModel.getEventStats({userId: user.id}),
        TicketsModel.getTicketsRevenueByMonthAndYear({}),
    ]);

    const resultData = {
        totalEvents: eventsStats?.data?.totalEvents,
        totalCategories: eventsStats?.data?.totalCategories,
        categories: eventsStats?.data?.categories,
        tickets: ticketsStats?.data,
    };

    res.status(httpStatus.OK).json({
        data: resultData,
    });
};
