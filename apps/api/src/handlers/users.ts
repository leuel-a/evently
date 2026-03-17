import httpStatus from 'http-status';
import AccountsModel from '../models/accounts/index.js';

/** @type {import('express').RequestHandler} */
export async function getLinkedAccountsHandler(req, res, next) {
    try {
        const user = req.user;
        const result = await AccountsModel.getLinkedAccounts(user.id);

        res.json(result);
    } catch (error) {
        next(error);
    }
}

/** @type {import('express').RequestHandler} */
export async function getAuthenticatedUser(req, res, next) {
    try {
        const user = req.user;
        const session = req.session;
        res.status(httpStatus.OK).json({user, session});
    } catch (error) {
        next(error);
    }
}
