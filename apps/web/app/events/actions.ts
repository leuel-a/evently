'use server';

import {revalidatePath} from 'next/cache';
import {makeApiCall} from '@/config/api';
import {API_ROUTES, APP_ROUTES} from '@/config/routes';
import {GetEventsApiResponse} from '@/types/events';
import {IActionResult} from '@/types/utils';

export type GetEventsPageResult = GetEventsApiResponse;
export async function getEvents(
    params: Record<string, string>,
): Promise<IActionResult<GetEventsPageResult>> {
    try {
        const searchParams = new URLSearchParams(params);
        const response = await makeApiCall<GetEventsApiResponse>({
            url: `${API_ROUTES.public.events.base}?${searchParams.toString()}`,
        });
        return {success: true, data: response};
    } catch (error) {
        return {success: false};
    }
}

export async function revalidateEventsPage() {
    revalidatePath(APP_ROUTES.events.base);
}
