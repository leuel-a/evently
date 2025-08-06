'use server';

import {ZodError} from 'zod';
import prisma from '@/lib/db/prisma';
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
        const parsedEvent = await eventsSchema.parseAsync(values);
        const {category: categoryId, ...cleanValues} = parsedEvent;
        const createdEvent = await prisma.events.create({data: {...cleanValues, userId: values.userId, categoryId: parsedEvent.category}});

        return {success: true, error: null, data: createdEvent};
    } catch (e: any) {
        console.log(`\nError in CreateEventAction: ${e}`);
        if (e instanceof ZodError) {
            const errors = e.flatten().fieldErrors;
            const validationErrorsWithDetails: ValidationErrorDetails[] = Object.entries(errors).map(([key, value]) => ({path: key, message: value}));
            return {success: false, error: validationErrorsWithDetails};
        }

        const appError = new AppError();
        return {success: false, error: appError};
    }
}
