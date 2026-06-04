'use client';

import {useRouter} from 'next/navigation';
import {FormProvider, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';
import {createEventCategoryMutation} from '@/app/dashboard/events-category/create/queries';
import {EventCategoryForm} from '@/components/pages/Dashboard/Form/EventCategory';
import {zodResolver} from '@hookform/resolvers/zod';
import {eventCategorySchema, type EventCategorySchemaType} from '@/lib/db/schema';
import { APP_ROUTES } from '@/config/routes';
import { revalidateEventCategories } from '@/app/dashboard/events-category/actions';

const EVENT_CREATED_SUCCESS_TITLE = 'Event category created';
const EVENT_CREATED_ERROR_TITLE = 'Failed to create event category';
const EVENT_CREATED_ERROR_DESCRIPTION = 'Something went wrong. Please try again.';

export function CreateEventCategoryForm() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(eventCategorySchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const mutation = useMutation({
        mutationFn: createEventCategoryMutation,
        onSuccess: async (data) => {
            await revalidateEventCategories() // TODO: there might be a better way to do this but for not this works

            const {data: createdEventCategory} = data;
            toast.success(EVENT_CREATED_SUCCESS_TITLE, {
                description: `"${createdEventCategory.name}" has been successfully created.`,
            });

            router.push(APP_ROUTES.dashboard.eventsCategory.base);
        },
        onError: () => {
            toast.error(EVENT_CREATED_ERROR_TITLE, {
                description: EVENT_CREATED_ERROR_DESCRIPTION,
            });
        },
    });

    const handleSubmit = async (values: EventCategorySchemaType) => {
        mutation.mutate(values);
    };

    return (
        <FormProvider {...form}>
            <div className="flex flex-col gap-6 p-8 pl-4 w-7xl">
                <EventCategoryForm onSubmit={handleSubmit} />
            </div>
        </FormProvider>
    );
}
