'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {FormProvider, useForm} from 'react-hook-form';
import {UserSignupForm} from '@/components/pages/auth/Form/Signup/UserSignupForm';
import {userSignupSchema} from '@/components/pages/auth/Form/Signup/schema';
import type {UserSignupSchemaType} from '@/components/pages/auth/Form/Signup/schema';
import {createUserAction} from '../actions';

export default function Page() {
    const form = useForm<UserSignupSchemaType>({
        resolver: zodResolver(userSignupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmitHanlder = async (values: UserSignupSchemaType) => {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await createUserAction(formData);
    };

    return (
        <FormProvider {...form}>
            <div className="flex h-screen w-full items-center justify-center pt-20">
                <UserSignupForm handleSubmit={onSubmitHanlder} />
            </div>
        </FormProvider>
    );
}
