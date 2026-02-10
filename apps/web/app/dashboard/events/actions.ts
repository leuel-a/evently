'use server';

import {makeApiCall} from '@/config/api';
import {API_ROUTES} from '@/config/routes';
import {SettingsApiResponse, EventApiResponse} from '@/types';

export async function getEventsPageData(): Promise<{
    events: EventApiResponse;
    settings: SettingsApiResponse;
}> {
    const [events, settings] = await Promise.all([
        makeApiCall<EventApiResponse>({url: API_ROUTES.events.base}),
        makeApiCall<SettingsApiResponse>({url: API_ROUTES.settings.base}),
    ]);
    return {events, settings};
}
