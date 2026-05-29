import {fromNodeHeaders} from 'better-auth/node';
import {type RequestHandler} from 'express';
import {getAuth} from '../lib/auth';
import {ERROR_MESSAGES, errors} from '../errors/utils';

export const requireUser: RequestHandler = async (req, res, next) => {
    try {
        console.log({headers: fromNodeHeaders(req.headers)});

        const auth = getAuth();
        const session = await auth.api.getSession({headers: fromNodeHeaders(req.headers)});

        if (!session) {
            throw errors.unauthorized(ERROR_MESSAGES.UNAUTHORIZED);
        }

        res.locals.session = session.session;
        res.locals.user = session.user;

        next();
    } catch (error) {
        next(error);
    }
};
