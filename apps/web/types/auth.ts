import {User, Session} from 'better-auth';

export interface BaseUserResponse extends User {
    isOrganizer?: boolean;
    organizationName?: string;
}

export interface AuthSessionData {
    session: Session;
    user: User;
}

export interface UserSigninResponse {
    redirect: boolean;
    token: string;
    user: BaseUserResponse;
}
