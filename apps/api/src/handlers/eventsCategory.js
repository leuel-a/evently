import httpStatus from 'http-status';
import {matchedData} from 'express-validator';
import {errors} from '../errors/utils.js';
import EventCategory from '../models/eventsCategory/index.js';

const EVENT_CATEGORY_NOT_FOUND_MESSAGE = 'Event Category not found';

/** @type {import('express').RequestHandler} */
export async function getEventCategoriesHandler(req, res, next) {
    try {
        const {limit, page} = matchedData(req, {locations: ['query']});
        const results = await EventCategory.getEventCategories({page, size: limit});
        const responseRaw = {
            data: results?.data,
            page: page,
            limit: results?.limit,
        };

        res.status(httpStatus.OK).json(responseRaw);
    } catch (err) {
        next(err);
    }
}

/** @type {import('express').RequestHandler} */
export async function getEventCategoryHandler(req, res, next) {
    try {
        const {id} = matchedData(req, {locations: ['params']});

        const result = await EventCategory.getEventCategory({id}, {lean: false});
        if (!result?.data || Object.keys(result?.data).length === 0) {
            throw errors.notFound(EVENT_CATEGORY_NOT_FOUND_MESSAGE);
        }

        res.status(httpStatus.OK).json(result);
    } catch (error) {
        next(error);
    }
}

/** @type {import('express').RequestHandler} */
export async function createEventCategoryHandler(req, res, next) {
    try {
        const body = matchedData(req, {locations: ['body']});
        const eventCategory = await EventCategory.createEventCategory(body);

        res.status(httpStatus.CREATED).json({data: eventCategory});
    } catch (error) {
        next(error);
    }
}

/** @type {import('express').RequestHandler} */
export async function updateEventHandler(req, res, next) {
    try {
        const params = matchedData(req, {locations: ['params']});
        const body = matchedData(req, {locations: ['body']});

        const result = await EventCategory.updateEventCategory(params?.id, body);
        res.status(httpStatus.OK).json(result);
    } catch (error) {
        next(error);
    }
}

/** @type {import('express').RequestHandler} */
export async function deleteEventHandler(req, res, next) {
    try {
        const params = matchedData(req, {locations: ['params']});
        const result = await EventCategory.deleteEventCategory(params?.id);

        res.status(httpStatus.OK).json({data: result});
    } catch (error) {
        next();
    }
}
