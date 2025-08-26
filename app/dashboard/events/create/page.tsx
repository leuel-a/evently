'use client';

import {useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {zodResolver} from '@hookform/resolvers/zod';
import {EventForm} from '@/components/pages/dashboard/Form/Event/EventForm';
import {Separator} from '@/components/ui/separator';
import {APP_ROUTES} from '@/config/routes';
import {eventsSchema} from '@/lib/db/schema';
import type {EventSchemaType} from '@/lib/db/schema';
import {convertObjectToFormData} from '@/utils/functions';
import {createEventAction} from '../actions';

export default function Page() {
    const router = useRouter();
    const form = useForm<EventSchemaType>({
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
            capacity: 0,
            isVirtual: false,
        },
    });

    const [submitting, setSubmitting] = useState<boolean>();
    const {error: addressInputError} = form.getFieldState('address');

    const handleSubmit = async (values: EventSchemaType) => {
        setSubmitting(true);
        const {success} = await createEventAction(convertObjectToFormData(values));
        if (success) {
            toast('Event Created Succesfully');
            router.push(APP_ROUTES.dashboard.events.base);
        } else {
            toast.error('Something went wrong');
        }
        setSubmitting(false);
    };

    return (
        <FormProvider {...form}>
            <div className="flex flex-col gap-6 bg-white p-8 pl-4">
                <div className="mb-4 space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight text-indigo-700">Create a new event</h2>
                    <Separator className="h-1 w-full bg-indigo-400" />
                </div>
                <div className="w-full xl:w-3/4">
                    <EventForm
                        CustomAddressAutofillInputProps={{error: addressInputError}}
                        SubmitButtonProps={{disabled: submitting}}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </FormProvider>
    );
}
