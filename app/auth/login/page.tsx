'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {FormProvider, useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import {LoginForm} from '@/components/pages/auth/Form/Login/LoginForm';
import {loginSchema} from '@/components/pages/auth/Form/Login/schema';
import type {LoginSchemaType} from '@/components/pages/auth/Form/Login/schema';

export default function Page() {
    const methods = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<LoginSchemaType> = (values) => {
        console.log(values);
    };

    return (
        <FormProvider {...methods}>
            <div className="flex h-screen w-full items-center justify-center">
                <LoginForm onSubmit={onSubmit} />
            </div>
        </FormProvider>
    );
}
