import {type RequestHandler} from 'express';
import httpStatus from 'http-status';
import {matchedData} from 'express-validator';
import EventsModel from '../models/events/index.js';
import {errors} from '../errors/utils.js';

const EVENT_NOT_FOUND_MESSAGE = 'Event not found';

export const createEventHandler: RequestHandler = async (req, res, next) => {
    try {
        const body = matchedData(req, {locations: ['body']});
        const event = await EventsModel.createEvent(body);

        res.status(httpStatus.CREATED).json({data: event});
    } catch (error) {
        next(error);
    }
};

export const getEventHandler: RequestHandler = async (req, res, next) {
    try {
        const {id} = matchedData(req, {locations: ['params']});
        const result = await EventsModel.getEvent({id});

        if (!result?.data || Object.keys(result?.data).length === 0) {
            throw errors.notFound(EVENT_NOT_FOUND_MESSAGE);
        }

        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}

export const getEventsHandler: RequestHandler = async (req, res, next) => {
    try {
        const user = req.user;
        const {page, limit} = matchedData(req, {locations: ['query']});

        const results = await EventsModel.getEvents({page, size: limit, userId: user.id});

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

export const updateEventHandler: RequestHandler = async (req, res, next) => {
    try {
        const body = matchedData(req, {locations: ['body']});
        const {id} = matchedData(req, {locations: ['params']});

        const result = await EventsModel.updateEvent(id, body);
        res.status(httpStatus.OK).json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteEventHandler: RequestHandler = (req, res, next) => {
    try {
        const {id} = matchedData(req, {locations: ['params']});
        const result = await EventsModel.deleteEvent(id);

        if (!result) {
            throw errors.notFound(EVENT_NOT_FOUND_MESSAGE);
        }

        res.status(httpStatus.OK).json(result);
    } catch (error) {
        next(error);
    }
}
