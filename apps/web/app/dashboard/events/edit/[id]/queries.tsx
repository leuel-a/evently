import {MutationFunction} from '@tanstack/react-query';
import {EventSchemaType as UpdateEventSchemaType} from '@/lib/db/schema';
import {UpdateEventApiResponse} from '@/types/events';
import {makeApiCall} from '@/config/api';
import {APP_ROUTES} from '@/config/routes';

export const updateEventMutation: MutationFunction<
    UpdateEventApiResponse,
    UpdateEventSchemaType & {id: string}
> = (input) => {
    return makeApiCall({
        url: `${APP_ROUTES.api.events}/${input?.id}`,
        internal: true,
        method: 'PUT',
        body: JSON.stringify(input),
    });
};
