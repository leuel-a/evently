'use client';

import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginUserForm} from '@/components/pages/auth/Form/Login/LoginUserForm';
import {APP_ROUTES} from '@/config/routes';
import authClient from '@/lib/auth-client';
import {BASE_ERROR_CODES} from '@/lib/codes';
import {loginUserSchema} from '@/lib/db/schema';
import type {LoginUserSchemaType} from '@/lib/db/schema';
import {convertEnumStyleStringToNormalString} from '@/utils/strings';

export default function Page() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const methods = useForm<LoginUserSchemaType>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const {setError} = methods;
    const onSubmitHandler: SubmitHandler<LoginUserSchemaType> = async (values) => {
        setIsSubmitting(true);
        const {email, password} = values;
        const {error} = await authClient.signIn.email({email, password});

        if (error) {
            const normalErrorCode = convertEnumStyleStringToNormalString(
                BASE_ERROR_CODES.EMAIL_NOT_VERIFIED,
            );
            if (error.message === normalErrorCode) {
                setError('root.serverError', {message: error?.message, type: error?.code});
                return;
            }
            setError('root.serverError', {message: error?.message, type: error?.code});
            setIsSubmitting(false);
        } else {
            router.push(APP_ROUTES.base);
            setIsSubmitting(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col bg-white h-screen w-full items-center justify-center">
                <LoginUserForm
                    isSubmitting={isSubmitting}
                    handleSubmit={onSubmitHandler}
                />
            </div>
        </FormProvider>
    );
}
