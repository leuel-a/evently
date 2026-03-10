import httpStatus from 'http-status';
import {matchedData} from 'express-validator';
import TicketsModel from '../models/tickets/index.js';

/** @type {import('express').RequestHandler} */
export async function getTicketsHandler(req, res, next) {
    try {
        const user = req.user;
        const {page, limit, status} = matchedData(req, {locations: ['query']});

        const results = await TicketsModel.getTickets({
            userId: user.id,
            page,
            size: limit,
            status,
        });

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
}
