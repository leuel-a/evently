'use server';

import { headers as nextHeaders } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { makeApiCall } from '@/config/api';
import { API_ROUTES, APP_ROUTES } from '@/config/routes';
import { EVENT_STATUS } from '@evently/models/events/constants';
import { GetEventsApiResponse, GetEventApiResponse } from '@/types/events';
import { IActionResult } from '@/types/utils';
import { setValueToFilterParams } from '@/utils/filters';
import { BaseUserResponse } from '@/types/auth';
import { Session } from 'better-auth';

export type GetSessionResult = {
    user: BaseUserResponse;
    session: Session;
};

export type GetEventsPageResult = GetEventsApiResponse;
export async function getEvents(
    params: Record<string, string>,
): Promise<IActionResult<GetEventsPageResult>> {
    try {
        const searchParams = setValueToFilterParams(
            new URLSearchParams(params),
            'status',
            EVENT_STATUS.ACTIVE,
        ).toString();
        const response = await makeApiCall<GetEventsApiResponse>({
            url: `${API_ROUTES.public.events.base}?${searchParams.toString()}`,
        });
        return { success: true, data: response };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}

export type GetEventPageResult = GetEventApiResponse;
export async function getEvent(id: string): Promise<IActionResult<GetEventPageResult>> {
    try {
        const response = await makeApiCall<GetEventApiResponse>({
            url: `${API_ROUTES.public.events.base}/${id}`,
        });
        return { success: true, data: response };
    } catch (error) {
        return { success: false };
    }
}

export async function revalidateEventsPage() {
    revalidatePath(APP_ROUTES.events.base);
}

export async function getSession(): Promise<IActionResult<GetSessionResult>> {
    try {
        const headers = await nextHeaders();
        const response = await makeApiCall<GetSessionResult>({ url: API_ROUTES.users.me, headers });
        return { success: true, data: response };
    } catch (err) {
        return { success: false };
    }
}
