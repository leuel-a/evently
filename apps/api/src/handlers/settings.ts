import httpStatus from 'http-status';
import ResourceModel from '../models/resources/index.js';
import EventsModel from '../models/events/index.js';

/** @type {import('express').RequestHandler} */
export async function getSettingsHandler(_req, res, next) {
    try {
        const [resources, categories] = await Promise.all([
            ResourceModel.getResources(),
            EventsModel.getSettingEventCategories(),
        ]);
        res.status(httpStatus.OK).json({resources, ...categories});
    } catch (error) {
        console.log({error});
        next(error);
    }
}
