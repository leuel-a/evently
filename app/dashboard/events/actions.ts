'use server';

import {_statusCode} from 'better-auth';
import {ZodError} from 'zod';
import {getServerSession} from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import {eventsSchema} from '@/lib/db/schema';
import {ValidationErrorDetails, AppError} from '@/lib/error';
import type {IActionState} from '@/types/utils/ActionState';
import {convertFormDataToObject} from '@/utils/functions';

export async function createEventAction(formData: FormData): Promise<IActionState> {
    const values = convertFormDataToObject(formData);
    const session = await getServerSession();

    if (!session || !session.user) {
        const appError = new AppError('UNAUTHORIZED');
        return {success: false, error: appError};
    }

    try {
        const parsedEvent = await eventsSchema.parseAsync(values);
        const {category: categoryId, ...cleanValues} = parsedEvent;
        const createdEvent = await prisma.events.create({data: {...cleanValues, userId: session.user.id, categoryId: parsedEvent.category}});

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
