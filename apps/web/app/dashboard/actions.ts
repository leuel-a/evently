'use server';

import type {User, Session} from 'better-auth';
import {headers as nextHeaders} from 'next/headers';
import {makeApiCall} from '@/config/api';
import {API_ROUTES} from '@/config/routes';
import type {IActionResult} from '@/types/utils';
import {ApiError} from '@/lib/error';

export type GetSessionResult = {
    user: User;
    session: Session;
};

export async function getSession(): Promise<IActionResult<GetSessionResult>> {
    try {
        const headers = await nextHeaders();
        const response = await makeApiCall<GetSessionResult>({url: API_ROUTES.users.me, headers});

        return {success: true, data: response};
    } catch (err) {
        return {success: false};
    }
}
