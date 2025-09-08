import type {QueryFunction} from '@tanstack/react-query';
import {EventsCategory} from '@/app/generated';
import {makeApiCall} from '@/config/axios';
import {API_ROUTES} from '@/config/routes';

export const getEventsQuery: QueryFunction<Array<EventsCategory>> = async () => {
    const eventCategory = await makeApiCall<Array<EventsCategory>>({url: `${API_ROUTES.eventCategory.base}`});
    return eventCategory.data;
};
