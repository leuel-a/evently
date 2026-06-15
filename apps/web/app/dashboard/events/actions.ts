'use server';

import {revalidatePath} from 'next/cache';
import {headers as nextHeaders} from 'next/headers';
import {makeApiCall} from '@/config/api';
import {API_ROUTES, APP_ROUTES} from '@/config/routes';
import {ApiError} from '@/lib/error';
import type {IActionResult} from '@/types/utils';
import type {GetEventsApiResponse} from '@/types/events';
import type {SettingsApiResponse} from '@/types/settings';

export type GetEventsPageResultData = {
    events: GetEventsApiResponse;
    settings: SettingsApiResponse;
};

export async function getEventsPageData(
    params: Record<string, string>,
): Promise<IActionResult<GetEventsPageResultData>> {
    try {
        const searchParams = new URLSearchParams(params);
        const headers = await nextHeaders();

        const [events, settings] = await Promise.all([
            makeApiCall<GetEventsApiResponse>({
                url: `${API_ROUTES.events.base}?${searchParams.toString()}`,
                headers,
            }),
            makeApiCall<SettingsApiResponse>({url: API_ROUTES.settings.base, headers}),
        ]);

        return {success: true, data: {events, settings}};
    } catch (err) {
        const error = err as ApiError;
        return {success: false, error: error};
    }
}

export async function revalidateEvents() {
    revalidatePath(APP_ROUTES.dashboard.events.base);
}
