import {type RequestHandler} from 'express';
import httpStatus from 'http-status';
import {matchedData} from 'express-validator';
import EventsModel from '../models/events';
import {errors} from '../errors/utils';
import {IEvent} from '../models/events/schema';

// INFO: organize the messages better in another file
const EVENT_NOT_FOUND_MESSAGE = 'Event not found';
const EVENT_USER_NOT_AUTHORIZED_MESSAGE = 'Forbidden';

export const createEventHandler: RequestHandler = async (req, res, next) => {
    try {
        const currentUser = res.locals.user;
        const body = matchedData(req, {locations: ['body']}) as IEvent;

        const payload = {...body, user: currentUser?.id};
        const result = await EventsModel.createEvent(payload);
        const {_id, ...rest} = result.toObject();

        const resultData = {id: _id.toString(), ...rest};
        res.status(httpStatus.CREATED).json({data: resultData});
    } catch (error) {
        next(error);
    }
};

export const getEventHandler: RequestHandler = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const {id} = matchedData(req, {locations: ['params']});
        const result = await EventsModel.getEvent({id});

        if (!result?.data || Object.keys(result?.data).length === 0) {
            throw errors.notFound(EVENT_NOT_FOUND_MESSAGE);
        }

        // INFO: there might be a better way to do this
        const resultData = result?.data;
        if (resultData?.user.toString() !== user?.id) {
            throw errors.forbidden(EVENT_USER_NOT_AUTHORIZED_MESSAGE);
        }

        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
};

// TODO: there needs to be a public [GET] /events endpoint, figure out how to do this?
export const getEventsHandler: RequestHandler = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const {page, limit, filters, q} = matchedData(req, {locations: ['query']});

        const results = await EventsModel.getEvents({
            page,
            size: limit,
            userId: user?.id as string,
            filters,
            q,
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

export const deleteEventHandler: RequestHandler = async (req, res, next) => {
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
};
