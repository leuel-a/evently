import type {QueryFunction} from '@tanstack/react-query';
import type {EventApiResponse} from '@/types/events';
import type {SettingsApiResponse} from '@/types/settings';
import {API_ROUTES} from '@/config/routes';

export const fetchEvents: QueryFunction<EventApiResponse, ['events']> = async () => {
    const response = await fetch(API_ROUTES.events.base);

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    return response.json();
};

export const getSettings: QueryFunction<SettingsApiResponse, ['settings']> = async () => {
    const response = await fetch('/api/settings');

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    return response.json();
};
