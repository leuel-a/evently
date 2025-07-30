'use client';

import {FormProvider, useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginUserForm} from '@/components/pages/auth/Form/Login/LoginUserForm';
import authClient from '@/lib/auth-client';
import {BASE_ERROR_CODES} from '@/lib/codes';
import {convertEnumStyleStringToNormalString} from '@/utils/strings';
import {loginUserSchema} from '@/lib/db/schema';
import type {LoginUserSchemaType} from '@/lib/db/schema';

export default function Page() {
    const methods = useForm<LoginUserSchemaType>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const {setError} = methods;

    const onSubmitHandler: SubmitHandler<LoginUserSchemaType> = async (values) => {
        const {email, password} = values;
        const {error} = await authClient.signIn.email({email, password});

        if (error) {
            const normalErrorCode = convertEnumStyleStringToNormalString(BASE_ERROR_CODES.EMAIL_NOT_VERIFIED);
            console.log(normalErrorCode);
            if (error.message === normalErrorCode) {
                setError('root.serverError', {message: error?.message, type: error?.code});
            }
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col bg-white h-screen w-full items-center justify-center">
                <LoginUserForm handleSubmit={onSubmitHandler} />
            </div>
        </FormProvider>
    );
}
