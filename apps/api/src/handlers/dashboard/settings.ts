import {RequestHandler} from 'express';
import httpStatus from 'http-status';
import ResourceModel from '../../models/resources';
import EventsModel from '../../models/events';
import EventsCategoryModel from '../../models/eventsCategory';

export const getSettingsHandler: RequestHandler = async (_req, res, next) => {
    try {
        const user = res.locals.user;
        const [resources, eventsSettings, eventsCategorySettings] = await Promise.all([
            ResourceModel.getResources(),
            EventsModel.getSettingsForDashboard({userId: user?.id}),
            EventsCategoryModel.getSettingsForDashboard({userId: user?.id}),
        ]);
        res.status(httpStatus.OK).json({resources, ...eventsSettings, ...eventsCategorySettings});
    } catch (error) {
        console.log({error});
        next(error);
    }
};
