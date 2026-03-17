import {User, Session} from 'better-auth';
import {Types} from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            user?: User;
            session?: Session;
        }
    }
}
