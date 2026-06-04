import {MutationFunction} from '@tanstack/react-query';
import type {CreateEventsCategoryApiResponse} from '@/types/eventsCategory';
import {makeApiCall} from '@/config/api';
import {APP_ROUTES} from '@/config/routes';
import {EventCategorySchemaType} from '@/lib/db/schema';

export const createEventCategoryMutation: MutationFunction<
    CreateEventsCategoryApiResponse,
    EventCategorySchemaType
> = async (input) => {
    return makeApiCall({
        url: APP_ROUTES.api.eventsCategory,
        internal: true,
        method: 'POST',
        body: JSON.stringify(input),
    });
};
