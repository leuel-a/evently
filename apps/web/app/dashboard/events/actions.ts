'use server';

import {makeApiCall} from '@/config/api';
import {API_ROUTES} from '@/config/routes';
import {AppError} from '@/lib/error';
import type {IActionResult} from '@/types/utils';
import type {EventApiResponse} from '@/types/events';
import type {SettingsApiResponse} from '@/types/settings';

export type GetEventsPageResultData = {
    events: EventApiResponse;
    settings: SettingsApiResponse;
};

export async function getEventsPageData(): Promise<IActionResult<GetEventsPageResultData>> {
    try {
        const [events, settings] = await Promise.all([
            makeApiCall<EventApiResponse>({url: API_ROUTES.events.base}),
            makeApiCall<SettingsApiResponse>({url: API_ROUTES.settings.base}),
        ]);
        return {success: true, data: {events, settings}};
    } catch (err) {
        const error = new AppError({message: '', statusCode: 400});
        return {success: false, error};
    }
}
