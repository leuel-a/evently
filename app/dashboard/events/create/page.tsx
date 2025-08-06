'use client';

import {useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod';
import {EventForm} from '@/components/pages/dashboard/Form/Event/EventForm';
import {Separator} from '@/components/ui/separator';
import {APP_ROUTES} from '@/config/routes';
import {useAuthContext} from '@/context/AuthContext';
import {eventsSchema} from '@/lib/db/schema';
import type {EventSchemaType} from '@/lib/db/schema';
import {convertObjectToFormData} from '@/utils/functions';
import {createEventAction} from '../actions';

export default function Page() {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const router = useRouter();
    const {user} = useAuthContext();
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

    const onSubmit = async (values: EventSchemaType) => {
        setSubmitting(true);
        const formData = convertObjectToFormData({...values, userId: user?.id});
        const {error} = await createEventAction(formData);

        if (error) {
            form.setError('root.serverError', {message: 'Something went wrong, please try again'});
            setSubmitting(false);
        } else {
            setSubmitting(false);
            return router.push(APP_ROUTES.dashboard.events.base);
        }
    };
    const {error: addressInputError} = form.getFieldState('address');

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
                        isSubmitting={submitting}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </FormProvider>
    );
}
