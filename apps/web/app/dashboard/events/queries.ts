import type {QueryFunction} from '@tanstack/react-query';
import type {EventApiResponse, SettingsApiResponse} from '@/types';

export const fetchEvents: QueryFunction<EventApiResponse, ['events']> = async () => {
    const response = await fetch('/api/events');

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
