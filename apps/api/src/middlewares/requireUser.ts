import {type RequestHandler} from 'express';
import {getAuth} from '../lib/auth';
import {ERROR_MESSAGES, errors} from '../errors/utils';

export const requireUser: RequestHandler = async (req, _res, next) => {
    try {
        const auth = getAuth();
        const session = await auth.api.getSession({headers: req.headers});

        if (!session) {
            throw errors.unauthorized(ERROR_MESSAGES.UNAUTHORIZED);
        }

        req.session = session.session;
        req.user = session.user;

        next();
    } catch (error) {
        next(error);
    }
};
