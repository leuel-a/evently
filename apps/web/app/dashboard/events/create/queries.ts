import {MutationFunction} from '@tanstack/react-query';
import {makeApiCall} from '@/config/api';
import {APP_ROUTES} from '@/config/routes';
import {EventSchemaType as CreateEventSchemaType} from '@/lib/db/schema';
import {CreateEventApiResponse} from '@/types/events';

export const createEventMutation: MutationFunction<
    CreateEventApiResponse,
    CreateEventSchemaType
> = (input) => {
    return makeApiCall({
        url: APP_ROUTES.api.events,
        internal: true,
        method: 'POST',
        body: JSON.stringify(input),
    });
};
