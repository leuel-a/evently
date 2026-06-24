import express from 'express';
import httpStatus from 'http-status';
import {matchedData} from 'express-validator';
import EventsModel from '../models/events';

export const getEventsHandler: express.RequestHandler = async (req, res, next) => {
    try {
        const {page, limit, filters, q} = matchedData(req, {locations: ['query']});
        const results = await EventsModel.getEvents({page, size: limit, filters, q});

        const currentPage = Number(results?.page ?? 1);
        const currentLimit = Number(results?.limit ?? 10);
        const total = Number(results?.total ?? 0);

        const responseRaw = {
            data: results?.data ?? [],
            page: currentPage,
            limit: currentLimit,
            total,
            hasPreviousPage: currentPage > 1,
            hasNextPage: currentPage * currentLimit < total,
        };

        res.status(httpStatus.OK).json(responseRaw);
    } catch (error) {
        next(error);
    }
};
