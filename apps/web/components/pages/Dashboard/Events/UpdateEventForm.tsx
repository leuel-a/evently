'use client';

import {useRouter} from 'next/navigation';
import {FormProvider, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';
import {EventForm} from '../Form/Event/EventForm';
import {zodResolver} from '@hookform/resolvers/zod';
import {EventSchemaType, eventsSchema} from '@/lib/db/schema';
import {GetEditEventsPageData} from '@/app/dashboard/events/actions';
import {revalidateEvents} from '@/app/dashboard/events/actions';
import {updateEventMutation} from '@/app/dashboard/events/edit/[id]/queries';
import {APP_ROUTES} from '@/config/routes';

const EVENT_UPDATED_SUCCESS_TITLE = 'Event updated successfully'; // TODO: a better way to do this
const EVENT_UPDATED_ERROR_TITLE = 'Unable to update event';
const EVENT_UPDATED_ERROR_DESCRIPTION = ''; // TODO: this is a dynamic error

export interface UpdateEventFormProps {
    defaultValues: GetEditEventsPageData['data'];
}

export const UPDATE_EVENT_FORM_SUBMIT_BUTTON_LABEL = 'Edit';

export function UpdateEventForm(props: UpdateEventFormProps) {
    const {defaultValues} = props;
    const eventId = defaultValues.id;

    const router = useRouter();
    const form = useForm<EventSchemaType>({
        // INFO: for some reason zodresolver can not understand the type from zod.preprocess()
        // @ts-ignore
        resolver: zodResolver(eventsSchema),
        defaultValues: getDefaultValues(defaultValues),
    });

    const mutation = useMutation({
        mutationFn: updateEventMutation,
        onSuccess: async (data) => {
            await revalidateEvents();
            const {data: updatedEvent} = data;

            toast.success(EVENT_UPDATED_SUCCESS_TITLE, {
                description: `"${updatedEvent.title}" has been successfully created.`,
            });

            router.push(APP_ROUTES.dashboard.events.base);
        },
        onError: (error) => {
            console.log(error);
            toast.error(EVENT_UPDATED_ERROR_TITLE, {
                description: EVENT_UPDATED_ERROR_DESCRIPTION,
            });
        },
    });

    const handleSubmit = (values: EventSchemaType) => mutation.mutate({...values, id: eventId});

    return (
        <FormProvider {...form}>
            <div className="flex flex-col gap-6 p-8 pl-4 w-7xl">
                <EventForm
                    SubmitButtonProps={{label: UPDATE_EVENT_FORM_SUBMIT_BUTTON_LABEL}}
                    onSubmit={handleSubmit}
                />
            </div>
        </FormProvider>
    );
}

function getDefaultValues(data: GetEditEventsPageData['data']): EventSchemaType {
    const {
        title,
        description,
        address,
        createdAt,
        updatedAt,
        ticketPrice,
        capacity,
        date,
        location,
        country,
        isFree,
        startTime,
        status,
        type,
        endTime,
        isVirtual,
        category: {id: category},
    } = data;

    return {
        title,
        description,
        capacity,
        isFree,
        status,
        type,
        startTime,
        endTime,
        ticketPrice,
        isVirtual,
        date,
        location,
        country,
        address,
        createdAt,
        updatedAt,
        category,
    } as unknown as EventSchemaType;
}
