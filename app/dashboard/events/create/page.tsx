'use client';

import {useForm, FormProvider} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import type {Events} from '@/app/generated/prisma';
import type {MutationFunction} from '@tanstack/react-query';

import {zodResolver} from '@hookform/resolvers/zod';
import {Separator} from '@/components/ui/separator';
import {EventForm} from '@/components/pages/dashboard/Form/Event/EventForm';
import {eventsSchema} from '@/components/pages/dashboard/Form/Event/schema';
import type {EventSchemaType} from '@/components/pages/dashboard/Form/Event/schema';

import {axios} from '@/config/axios';

const createEvent: MutationFunction<Events, EventSchemaType> = async (data) => {
    const response = await axios.post('/events', data);
    return response.data;
};

export default function Page() {
    const methods = useForm<EventSchemaType>({
        resolver: zodResolver(eventsSchema),
        defaultValues: {
            title: '',
            description: '',
            date: new Date(),
            startTime: '10:30:00',
            endTime: '11:30:00',
            address: '',
            country: '',
            city: '',
            isVirtual: false,
        },
    });

    const mutation = useMutation({
        mutationKey: ['events', 'create'],
        mutationFn: createEvent,
        onSuccess: () => {
            console.log('Successfully created the new event');
        },
    });

    const onSubmit = (values: EventSchemaType) => {
        mutation.mutate(values);
    };

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col gap-6 bg-white p-8 pl-4">
                <div className="mb-4 space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight text-indigo-700">Create a new event</h2>
                    <Separator className="h-1 w-full bg-indigo-400" />
                </div>
                <div className="w-full xl:w-3/4">
                    <EventForm onSubmit={onSubmit} />
                </div>
            </div>
        </FormProvider>
    );
}
