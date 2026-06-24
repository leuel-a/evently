'use server';

import type {User, Session} from 'better-auth';
import {headers as nextHeaders} from 'next/headers';
import {makeApiCall} from '@/config/api';
import {API_ROUTES} from '@/config/routes';
import type {IActionResult, IApiResponse} from '@/types/utils';
import { SettingsApiResponse } from '@/types/settings';

export type GetSessionResult = {
    user: User;
    session: Session;
};

export async function getSession(): Promise<IActionResult<GetSessionResult>> {
    try {
        const headers = await nextHeaders();
        const response = await makeApiCall<GetSessionResult>({url: API_ROUTES.users.me, headers});

        return {success: true, data: response};
    } catch (err) {
        return {success: false};
    }
}

export type GetDashboardPageDataResult = {
    totalCategories: number;
    totalEvents: number;
    categories: Array<{name: string; count: number; id: string}>;
    tickets: {
        revenues: Array<{revenue: number; year: number; month: number}>;
        totalRevenue: number;
    };
};

export async function getDashboardPageData(): Promise<
    IActionResult<IApiResponse<GetDashboardPageDataResult>>
> {
    try {
        const headers = await nextHeaders();
        const response = await makeApiCall<IApiResponse<GetDashboardPageDataResult>>({
            url: API_ROUTES.dashboard.stats.dashboard,
            headers,
        });
        return {success: true, data: response};
    } catch (error) {
        return {success: false};
    }
}
export type GetDashboardSettingsResult = SettingsApiResponse;
export async function getDashboardSettings(): Promise<IActionResult<GetDashboardSettingsResult>> {
    try {
        const headers = await nextHeaders();
        const response = await makeApiCall<GetDashboardSettingsResult>({
            url: API_ROUTES.dashboard.settings.base,
            headers,
        });
        return {success: true, data: response};
    } catch (error) {
        return {success: false};
    }
}
