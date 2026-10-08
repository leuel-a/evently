import type {MutationFunction} from '@tanstack/react-query';
import {EmailSignupSchemaType, EmailSigninSchemaType} from '@/lib/db/schema';
import {authClient} from '@/lib/auth';
import {EmailSignupResponse} from '@/types/auth';
import {ApiError} from '@/lib/error';

export const emailSignupMutation: MutationFunction<
    EmailSignupResponse,
    EmailSignupSchemaType
> = async (input) => {
    const {email, password, fullName} = input;
    const {data, error} = await authClient.signUp.email({email, password, name: fullName});

    if (error) {
        console.log(error);
        throw new Error(error?.message ?? 'Signup Failed');
    }

    return data as EmailSignupResponse;
};

export const emailSigninMutation: MutationFunction<unknown, EmailSigninSchemaType> = async (
    input,
) => {
    const {email, password} = input;
    const {data, error} = await authClient.signIn.email({email, password});

    if (error) {
        throw new ApiError({
            message: error?.message ?? 'Something went wrong try again.',
            status: error?.status,
            statusText: error?.statusText,
        });
    }
    return data;
};
