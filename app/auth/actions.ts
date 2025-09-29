'use server';

import type {User} from 'better-auth';
import {revalidatePath} from 'next/cache';
import {headers as nextHeaders, cookies as nextCookies} from 'next/headers';
import {ZodError} from 'zod';
import {APP_ROUTES} from '@/config/routes';
import {auth, type Session} from '@/lib/auth';
import {userSignupSchema, loginUserSchema} from '@/lib/db/schema';
import {AppError, ValidationErrorDetails} from '@/lib/error';
import type {IActionState} from '@/types/utils/ActionState';
import {convertFormDataToObject} from '@/utils/functions';

export type AuthenticatedUser = Omit<User, 'organizationName' | 'image'> & {
    /**
     * NOTE: this is the SessionUser that is the same as the normal type User from
     * app/generated/client, but has since references can be undefined this
     * is needed
     **/
    organizationName?: string | null;
    image?: string | null;
};

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

export async function logoutUserAction(): Promise<IActionState> {
    try {
        const headers = await nextHeaders();
        const response = await auth.api.signOut({headers});

        if (response.success) {
            revalidatePath(APP_ROUTES.events.base);
            return {success: true};
        }

        const error = new AppError('INTERNAL_SERVER_ERROR', {message: 'Failed to logout user'});
        return {success: false, error};
    } catch (error: any) {
        return {success: false, error};
    }
}

export async function getCurrentSession(): Promise<IActionState<Session | null>> {
    try {
        const session = await auth.api.getSession({
            headers: await nextHeaders(),
        });
        return {success: Boolean(session), data: session};
    } catch (error) {
        return {success: false};
    }
}
