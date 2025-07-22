'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {FormProvider, useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import {userSignupSchema} from '@/components/pages/auth/Form/Signup/schema';
import type {UserSignupSchemaType} from '@/components/pages/auth/Form/Signup/schema';
import {UserSignupForm} from '@/components/pages/auth/Form/Signup/UserSignupForm';

export default function Page() {
    const methods = useForm<UserSignupSchemaType>({
        resolver: zodResolver(userSignupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit: SubmitHandler<UserSignupSchemaType> = (values) => {
        console.log(values);
    };

    return (
        <FormProvider {...methods}>
            <div className="flex h-screen w-full items-center justify-center pt-20">
                <UserSignupForm onSubmit={onSubmit} />
            </div>
        </FormProvider>
    );
}
