import httpStatus from 'http-status';
import {matchedData} from 'express-validator';
import EventsModel from '../models/events/index.js';
import {errors} from '../errors/utils.js';

const EVENT_NOT_FOUND_MESSAGE = 'Event not found';

/** @typedef {import('express').RequestHandler} RequestHandler */

/** @type {RequestHandler} */
export async function createEventHandler(req, res, next) {
    try {
        const body = matchedData(req, {locations: ['body']});
        const event = await EventsModel.createEvent(body);

        res.status(httpStatus.CREATED).json({data: event});
    } catch (error) {
        next(error);
    }
}

/** @type {RequestHandler} */
export async function getEventHandler(req, res, next) {
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

/** @type {RequestHandler} */
export async function getEventsHandler(req, res, next) {
    try {
        const {page, limit} = matchedData(req, {locations: ['query']});

        const results = await EventsModel.getEvents({page, size: limit});
        const responseRaw = {
            data: results?.data,
            page: page,
            limit: results?.limit,
        };

        res.status(httpStatus.OK).json(responseRaw);
    } catch (error) {
        next(error);
    }
}

/** @type {RequestHandler} */
export async function updateEventHandler(req, res, next) {
    try {
        const body = matchedData(req, {locations: ['body']});
        const {id} = matchedData(req, {locations: ['params']});

        const result = await EventsModel.updateEvent(id, body);
        res.status(httpStatus.OK).json(result);
    } catch (error) {
        next(error);
    }
}

/** @type {RequestHandler} */
export async function deleteEventHandler(req, res, next) {
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
