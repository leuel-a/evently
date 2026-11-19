import { User, Session } from 'better-auth';
import { IApiResponse } from './utils';

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

export type LinkedAccountResponse = {
    accountId: string,
    providerId: string
};

export type GetLinkedAccountResponse = IApiResponse<LinkedAccountResponse[]>;
