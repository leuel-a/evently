'use server';

import {headers as nextHeaders} from 'next/headers';
import {ApiError} from '@/lib/error';
import {IActionResult} from '@/types/utils';
import {GetTicketsApiResponse} from '@/types/tickets';
import {makeApiCall} from '@/config/api';
import {API_ROUTES} from '@/config/routes';
import {PageProps} from './page';

export type GetTicketsPageResultData = {
    tickets: GetTicketsApiResponse;
};

export async function getTicketsPageData(
    params: Awaited<PageProps['searchParams']>,
): Promise<IActionResult<GetTicketsPageResultData>> {
    try {
        const headers = await nextHeaders();
        const searchParams = new URLSearchParams(params);
        const tickets = await makeApiCall<GetTicketsApiResponse>({
            url: `${API_ROUTES.tickets.base}?${searchParams}`,
            headers,
        });

        return {success: true, data: {tickets}};
    } catch (err) {
        return {success: false};
    }
}
