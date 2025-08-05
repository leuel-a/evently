import {ZodError} from 'zod';
import {eventsSchema} from '@/lib/db/schema';
import {ValidationErrorDetails, AppError} from '@/lib/error';
import type {IActionState} from '@/types/utils/ActionState';
import {convertFormDataToObject} from '@/utils/functions';

export async function createEventAction(formData: FormData): Promise<IActionState> {
    const values = convertFormDataToObject(formData);

    if (!values.userId || typeof values.userId !== 'string' || values.userId.length === 0) {
        const appError = new AppError();
        return {success: false, error: appError, data: null};
    }

    try {
        const {userId, ...cleanValues} = values;
        const parsedEvent = await eventsSchema.parseAsync(cleanValues);

        const data = {...parsedEvent, userId};
        return {success: true, error: null, data};
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
