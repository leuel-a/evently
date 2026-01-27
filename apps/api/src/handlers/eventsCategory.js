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

        res.json(responseRaw);
    } catch (err) {
        next(err);
    }
}

/** @type {import('express').RequestHandler} */
export async function getEventCategoryHandler(req, res, next) {
    try {
        const {id} = matchedData(req, {locations: ['params']});

        const result = await EventCategory.getEventCategory({id});
        if (!result?.data || Object.keys(result?.data).length === 0) {
            throw errors.notFound(EVENT_CATEGORY_NOT_FOUND_MESSAGE);
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
