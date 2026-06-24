'use server';

import {revalidatePath} from 'next/cache';
import {headers as nextHeaders} from 'next/headers';
import {makeApiCall} from '@/config/api';
import {API_ROUTES, APP_ROUTES} from '@/config/routes';
import {ApiError} from '@/lib/error';
import type {IActionResult, IApiResponse} from '@/types/utils';
import type {GetEventsApiResponse, IEvent} from '@/types/events';
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
                url: `${API_ROUTES.dashboard.events.base}?${searchParams.toString()}`,
                headers,
            }),
            makeApiCall<SettingsApiResponse>({url: API_ROUTES.dashboard.settings.base, headers}),
        ]);

        return {success: true, data: {events, settings}};
    } catch (err) {
        const error = err as ApiError;
        return {success: false, error: error};
    }
}

export async function revalidateDashboardEventsPage() {
    revalidatePath(APP_ROUTES.dashboard.events.base);
}

export type GetEditEventsPageData = IApiResponse<IEvent>;
export async function getEditEventsPageData(
    id: string,
): Promise<IActionResult<GetEditEventsPageData>> {
    try {
        const headers = await nextHeaders();
        const response = await makeApiCall({
            url: `${API_ROUTES.dashboard.events.base}/${id}`,
            headers,
        });
        return {success: true, data: response as GetEditEventsPageData};
    } catch (error) {
        return {success: false};
    }
}
