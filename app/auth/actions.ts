'use server';

import {revalidatePath} from 'next/cache';
import {headers} from 'next/headers';
import {ZodError} from 'zod';
import {User} from '@/app/generated/client';
import {APP_ROUTES} from '@/config/routes';
import {auth} from '@/lib/auth';
import {userSignupSchema, loginUserSchema} from '@/lib/db/schema';
import {AppError, ValidationErrorDetails} from '@/lib/error';
import type {IActionState} from '@/types/utils/ActionState';
import {convertFormDataToObject} from '@/utils/functions';
import logger from '@/utils/logger';

export async function createUserAction(formData: FormData): Promise<IActionState> {
    const formValues = convertFormDataToObject(formData);
    try {
        const parsedUser = await userSignupSchema.parseAsync(formValues);
        const {name, email, password, isOrganizer, organizationName} = parsedUser;
        const data = await auth.api.signUpEmail({
            body: {email, password, name, isOrganizer, organizationName},
        });
        const user = data?.user as User;
        return {success: true, error: null, data: user};
    } catch (e: any) {
        console.log(JSON.stringify(e));
        if (e instanceof ZodError) {
            const errors = e.flatten().fieldErrors;
            const validationErrorsWithDetails: ValidationErrorDetails[] = Object.entries(
                errors,
            ).map(([key, value]) => ({path: key, message: value}));
            return {success: false, error: validationErrorsWithDetails};
        }
        const appError = new AppError();
        return {success: false, error: appError};
    }
}

export async function loginUserAction(formData: FormData): Promise<IActionState> {
    const formValues = Object.fromEntries(formData.entries());
    try {
        const parsedData = await loginUserSchema.parseAsync(formValues);
        const {email, password} = parsedData;
        const data = await auth.api.signInEmail({
            body: {email, password, callbackURL: APP_ROUTES.base},
        });
        return {success: true, error: null, data};
    } catch (e: any) {
        console.log(JSON.stringify(e));
        if (e instanceof ZodError) {
            const errors = e.flatten().fieldErrors;
            const validationErrorsWithDetails: ValidationErrorDetails[] = Object.entries(
                errors,
            ).map(([key, value]) => ({path: key, message: value}));
            return {success: false, error: validationErrorsWithDetails};
        }
        const appError = new AppError();
        return {success: false, error: appError};
    }
}

export async function logoutUserAction(
    _: IActionState,
    _formData: FormData,
): Promise<IActionState> {
    try {
        const {success} = await auth.api.signOut({headers: await headers()});
        if (success) {
            logger.info('User Successfully Logged Out');
            revalidatePath(APP_ROUTES.base);
            return {success: true};
        }

        const error = new AppError('INTERNAL_SERVER_ERROR', {message: 'Failed to logout user'});
        logger.error(`Error: occured while trying to logout user ${error}`);

        return {success: false, error};
    } catch (error: any) {
        logger.error(`Error: occured while trying to logout user ${error}`);
        return {success: false, error};
    }
}
