'use server';

import {revalidatePath} from 'next/cache';
import {headers as nextHeaders} from 'next/headers';
import {makeApiCall} from '@/config/api';
import {API_ROUTES, APP_ROUTES} from '@/config/routes';
import {ApiError} from '@/lib/error';
import type {IActionResult} from '@/types/utils';
import {GetEventsCategoryApiResponse} from '@/types/eventsCategory';

export type GetEventsCategoryPageResultData = {
    eventsCategory: GetEventsCategoryApiResponse;
};

export async function getEventsCategoryPageData(
    params: Record<string, string>,
): Promise<IActionResult<GetEventsCategoryPageResultData>> {
    try {
        const searchParams = new URLSearchParams(params);
        const headers = await nextHeaders();
        const [eventsCategory] = await Promise.all([
            makeApiCall<GetEventsCategoryApiResponse>({
                url: `${API_ROUTES.dashboard.eventCategory.base}?${searchParams.toString()}`,
                headers,
            }),
        ]);
        return {success: true, data: {eventsCategory}};
    } catch (err) {
        const error = err as ApiError;
        return {success: false, error: error};
    }
}

export async function revalidateEventCategories() {
    revalidatePath(APP_ROUTES.dashboard.eventsCategory.base);
}
