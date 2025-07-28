'use server';

import {ZodError} from 'zod';
import {User} from '@/app/generated/prisma';
import {auth} from '@/lib/auth';
import {userSignupSchema} from '@/lib/db/schema';
import {AppError, ValidationErrorDetails} from '@/lib/error';

export type IActionState = {
    data?: any;
    success?: boolean | undefined;
    error?: ValidationErrorDetails[] | AppError | null;
};

export async function createUserAction(formData: unknown): Promise<IActionState> {
    const formValues = Object.fromEntries((formData as FormData).entries());
    try {
        const parsedUser = await userSignupSchema.parseAsync(formValues);

        //FYI: for some reason the password is being passed as a class for some
        //reason figure out what is going on
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
            const validationErrorsWithDetails: ValidationErrorDetails[] = Object.entries(errors).map(([key, value]) => ({path: key, message: value}));

            return {success: false, error: validationErrorsWithDetails};
        }

        const appError = new AppError();
        return {success: false, error: appError};
    }
}
