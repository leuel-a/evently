import httpStatus from 'http-status';
import type {RequestHandler} from 'express';
import AccountsModel from '../models/accounts';

export const getLinkedAccountsHandler: RequestHandler = async (_req, res, next) => {
    try {
        const user = res.locals.user;
        const result = await AccountsModel.getLinkedAccounts(user.id);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const getAuthenticatedUser: RequestHandler = async (_req, res, next) => {
    try {
        const user = res.locals.user;
        const session = res.locals.session;

        res.status(httpStatus.OK).json({user, session});
    } catch (error) {
        next(error);
    }
};
