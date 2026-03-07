'use client';

import {useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {eventsSchema} from '@/lib/db/schema';
import {EventForm} from '@/components/pages/Dashboard/Form/Event/EventForm';
import type {EventSchemaType} from '@/lib/db/schema';
import {EVENT_TYPE} from '@/types/events';

export default function Page() {
    const form = useForm<EventSchemaType>({
        // INFO: for some reason zodresolver can not understand the type from zod.preprocess()
        // @ts-ignore
        resolver: zodResolver(eventsSchema),
        defaultValues: {
            title: '',
            description: '',
            date: new Date(),
            type: EVENT_TYPE.PHYSICAL,
            category: '',
            startTime: '10:30:00',
            endTime: '11:30:00',
            location: '',
            capacity: 0,
            isVirtual: false,
            isFree: false,
        },
    });

    const [_submitting, _setSubmitting] = useState<boolean>();
    const {error: locationInputError} = form.getFieldState('location');

    const handleSubmit = async (values: EventSchemaType) => {
        console.log('handler submit create event page');
        console.log(values);
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
