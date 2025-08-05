'use client';

import {FormProvider, useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod';
import {UserSignupForm} from '@/components/pages/auth/Form/Signup/UserSignupForm';
import {APP_ROUTES} from '@/config/routes';
import type {UserSignupSchemaType} from '@/lib/db/schema';
import {userSignupSchema} from '@/lib/db/schema';
import {convertObjectToFormData} from '@/utils/functions';
import {createUserAction} from '../actions';

export default function Page() {
    const router = useRouter();
    const form = useForm<UserSignupSchemaType>({
        resolver: zodResolver(userSignupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            isOrganizer: false,
        },
    });

    const onSubmitHandler = async (values: UserSignupSchemaType) => {
        const formData = convertObjectToFormData(values);
        const {success} = await createUserAction(formData);

        if (success) {
            router.push(APP_ROUTES.dashboard.events.base);
            return;
        }
    };

    return (
        <FormProvider {...form}>
            <div className="flex bg-white h-screen w-full items-center justify-center pt-20">
                <UserSignupForm handleSubmit={onSubmitHandler} />
            </div>
        </FormProvider>
    );
}
