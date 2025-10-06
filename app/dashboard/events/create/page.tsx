'use client';

import {useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {zodResolver} from '@hookform/resolvers/zod';
import {EventForm} from '@/components/pages/dashboard/Form/Event/EventForm';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {APP_ROUTES} from '@/config/routes';
import {eventsSchema} from '@/lib/db/schema';
import type {EventSchemaType} from '@/lib/db/schema';
import {convertObjectToFormData} from '@/utils/functions';
import {createEventAction} from '../../actions';

export default function Page() {
    const router = useRouter();
    const form = useForm<EventSchemaType>({
        // INFO: for some reason zodresolver can not understand the type from zod.preprocess()
        // @ts-ignore
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
            <div className="flex items-center flex-col gap-6 p-8 pl-4 mt-8">
                <div className="w-full xl:w-3/4 bg-white py-4 px-4">
                    <div className="flex gap-6 mb-4 items-center">
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft />
                        </Button>
                        <div>
                            <h2 className="text-xl font-medium tracking-tight text-indigo-700">
                                Create a new event
                            </h2>
                            <p className="text-sm text-gray-500">
                                Fill in the details to create your event
                            </p>
                        </div>
                    </div>
                    <Separator className="h-1 w-full bg-indigo-400" />
                </div>
                <div className="w-full xl:w-3/4 bg-white p-4">
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
