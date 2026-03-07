import {User, Session} from 'better-auth'

export type AuthSessionData = {
    session: Session;
    user: User;
};
