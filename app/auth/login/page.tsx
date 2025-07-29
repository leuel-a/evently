'use client';

import {FormProvider, useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginForm} from '@/components/pages/auth/Form/Login/LoginForm';
import {loginUserSchema} from '@/lib/db/schema';
import type {LoginUserSchemaType} from '@/lib/db/schema';
import {convertToFormData} from '@/utils/functions';
import {loginUserAction} from '../actions';

export default function Page() {
    const methods = useForm<LoginUserSchemaType>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmitHandler: SubmitHandler<LoginUserSchemaType> = async (values) => {
        const formData = convertToFormData(values);
        const {success, error, data} = await loginUserAction(formData);

        if (success) {
            console.dir(data, {depth: null});
        } else {
            console.dir(error, {depth: null});
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="flex bg-white h-screen w-full items-center justify-center">
                <LoginForm handleSubmit={onSubmitHandler} />
            </div>
        </FormProvider>
    );
}
