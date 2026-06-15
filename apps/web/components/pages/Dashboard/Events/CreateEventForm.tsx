'use client';

import {useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';
import {zodResolver} from '@hookform/resolvers/zod';
import {eventsSchema} from '@/lib/db/schema';
import {EventForm} from '@/components/pages/Dashboard/Form/Event/EventForm';
import type {EventSchemaType} from '@/lib/db/schema';
import {EVENT_TYPE} from '@/types/events';
import {createEventMutation} from '@/app/dashboard/events/create/queries';
import {revalidateEvents} from '@/app/dashboard/events/actions';
import {APP_ROUTES} from '@/config/routes';

const EVENT_CREATED_SUCCESS_TITLE = '';
const EVENT_CREATED_ERROR_TITLE = '';
const EVENT_CREATED_ERROR_DESCRIPTION = '';

export function CreateEventForm() {
    const router = useRouter();
    const form = useForm<EventSchemaType>({
        // INFO: for some reason zodresolver can not understand the type from zod.preprocess()
        // @ts-ignore
        resolver: zodResolver(eventsSchema),
        defaultValues: {
            title: '',
            description: '',
            date: new Date(),
            type: EVENT_TYPE.PHYSICAL,
            ticketPrice: 0,
            category: '',
            startTime: '10:30:00',
            endTime: '11:30:00',
            location: '',
            country: 'ETH',
            capacity: 0,
            isVirtual: false,
            isFree: false,
        },
    });

    const [_submitting, _setSubmitting] = useState<boolean>();
    const {error: locationInputError} = form.getFieldState('location');

    const mutation = useMutation({
        mutationFn: createEventMutation,
        onSuccess: async (data) => {
            await revalidateEvents(); // TODO: there might be a better way to do this but for now this works
            const {data: createdEvent} = data;

            toast.success(EVENT_CREATED_SUCCESS_TITLE, {
                description: `"${createdEvent.title}" has been successfully created.`,
            });

            router.push(APP_ROUTES.dashboard.events.base);
        },
        onError: () => {
            toast.error(EVENT_CREATED_ERROR_TITLE, {
                description: EVENT_CREATED_ERROR_DESCRIPTION,
            });
        },
    });

    const handleSubmit = async (values: EventSchemaType) => {
        mutation.mutate(values);
    };

    return (
        <FormProvider {...form}>
            <div className="flex flex-col gap-6 p-8 pl-4 w-7xl">
                <EventForm
                    CustomAddressAutofillInputProps={{error: locationInputError}}
                    onSubmit={handleSubmit}
                />
            </div>
        </FormProvider>
    );
}
