import {RequestHandler} from 'express'
import httpStatus from 'http-status';
import ResourceModel from '../models/resources/index';
import EventsModel from '../models/events/index';

export const getSettingsHandler: RequestHandler = async (_req, res, next) =>  {
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
