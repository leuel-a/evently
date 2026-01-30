import httpStatus from 'http-status';
import EventsModel from '../models/events/index.js';

/** @type {import('express').RequestHandler} */
export async function getSettingsHandler(_req, res, next) {
    try {
        const result = await EventsModel.getSettingEventCategories();
        res.status(httpStatus.OK).json(result);
    } catch (error) {
        next(error);
    }
}
