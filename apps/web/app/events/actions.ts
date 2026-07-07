'use server';

import {revalidatePath} from 'next/cache';
import {makeApiCall} from '@/config/api';
import {API_ROUTES, APP_ROUTES} from '@/config/routes';
import {EVENT_STATUS, GetEventsApiResponse, GetEventApiResponse} from '@/types/events';
import {IActionResult} from '@/types/utils';
import {setValueToFilterParams} from '@/utils/filters';

export type GetEventsPageResult = GetEventsApiResponse;
export async function getEvents(
    params: Record<string, string>,
): Promise<IActionResult<GetEventsPageResult>> {
    try {
        const searchParams = setValueToFilterParams((new URLSearchParams(params)),
            'status',
            EVENT_STATUS.ACTIVE,
        ).toString();
        const response = await makeApiCall<GetEventsApiResponse>({
            url: `${API_ROUTES.public.events.base}?${searchParams.toString()}`,
        });
        return {success: true, data: response};
    } catch (error) {
        return {success: false};
    }
}

export type GetEventPageResult = GetEventApiResponse;
export async function getEvent(id: string): Promise<IActionResult<GetEventPageResult>> {
    try {
        const response = await makeApiCall<GetEventApiResponse>({
            url: `${API_ROUTES.public.events.base}/${id}`,
        });
        return {success: true, data: response}
    } catch(error) {
        return {success: false}
    }
}

export async function revalidateEventsPage() {
    revalidatePath(APP_ROUTES.events.base);
}
