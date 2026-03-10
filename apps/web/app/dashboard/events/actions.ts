'use server';

import {headers as nextHeaders} from 'next/headers';
import {makeApiCall} from '@/config/api';
import {API_ROUTES} from '@/config/routes';
import {ApiError} from '@/lib/error';
import type {IActionResult} from '@/types/utils';
import type {EventApiResponse} from '@/types/events';
import type {SettingsApiResponse} from '@/types/settings';

export type GetEventsPageResultData = {
    events: EventApiResponse;
    settings: SettingsApiResponse;
};

export async function getEventsPageData(): Promise<IActionResult<GetEventsPageResultData>> {
    try {
        const headers = await nextHeaders();
        const [events, settings] = await Promise.all([
            makeApiCall<EventApiResponse>({url: API_ROUTES.events.base, headers}),
            makeApiCall<SettingsApiResponse>({url: API_ROUTES.settings.base}),
        ]);
        return {success: true, data: {events, settings}};
    } catch (err) {
        const error = err as ApiError
        return {success: false, error: error};
    }
}
