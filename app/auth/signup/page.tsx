'use client';

import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {UserSignupForm} from '@/components/pages/auth/Form/Signup/UserSignupForm';
import type {UserSignupSchemaType} from '@/lib/db/schema';
import {userSignupSchema} from '@/lib/db/schema';
import {createUserAction} from '../actions';

export default function Page() {
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
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        const {success, error, data} = await createUserAction(formData);

        if (success) {
            console.dir(data, {depth: null});
        } else {
            console.dir(error, {depth: null});
        }
    };

    return (
        <FormProvider {...form}>
            <div className="flex h-screen w-full items-center justify-center pt-20">
                <UserSignupForm handleSubmit={onSubmitHandler} />
            </div>
        </FormProvider>
    );
}
