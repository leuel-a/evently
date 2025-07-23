'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useActionState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {userSignupSchema} from '@/app/auth/schema';
import type {UserSignupSchemaType} from '@/app/auth/schema';
import {UserSignupForm} from '@/components/pages/auth/Form/Signup/UserSignupForm';
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

    const [_, formAction] = useActionState(createUserAction, undefined);

    return (
        <FormProvider {...form}>
            <div className="flex h-screen w-full items-center justify-center pt-20">
                <UserSignupForm action={formAction} />
            </div>
        </FormProvider>
    );
}
