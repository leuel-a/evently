'use client';

import {useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {eventsSchema} from '@/lib/db/schema';
import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {EventForm} from '@/components/pages/Dashboard/Form/Event/EventForm';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import type {EventSchemaType} from '@/lib/db/schema';

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

    const handleSubmit = async (_values: EventSchemaType) => {
        setSubmitting(false);
    };

    return (
        <FormProvider {...form}>
            <div className="flex flex-col gap-6 p-8 pl-4">
                <EventForm
                    CustomAddressAutofillInputProps={{error: addressInputError}}
                    SubmitButtonProps={{disabled: submitting}}
                    onSubmit={handleSubmit}
                />
            </div>
        </FormProvider>
    );
}
