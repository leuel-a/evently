'use server';

import {_statusCode} from 'better-auth';
import {headers} from 'next/headers';
import {auth} from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import {eventsSchema} from '@/lib/db/schema';
import {AppError} from '@/lib/error';
import {ValidationError} from '@/lib/error';
import {IActionState} from '@/types/utils/ActionState';
import {convertFormDataToObject} from '@/utils/functions';
import logger from '@/utils/logger';

export async function createEventAction(formData: FormData) {
    const values = convertFormDataToObject(formData);
    const session = await auth.api.getSession({headers: await headers()});

    if (!session || !session.user) {
        logger.error('Error creating new event: User is not authenticated');
        const error = new AppError('UNAUTHORIZED', {message: 'User is not authenticated'});
        return {success: false, error};
    }

    try {
        const {
            success: successParseEvent,
            data: parsedData,
            error: zodError,
        } = await eventsSchema.safeParseAsync(values);

        if (!successParseEvent) {
            const error = ValidationError.convertZodError(zodError);
            logger.error('Error creating new event: Unable to parse data', {error});
            return {success: false, error, data: null};
        }
        const {category, ...eventFields} = parsedData;
        const newEvent = await prisma.events.create({
            data: {...eventFields, userId: session.user.id, categoryId: category},
        });

        logger.info('Event created successfully');
        return {success: true, data: newEvent, error: null};
    } catch (error) {
        return {
            success: false,
            error: new AppError('INTERNAL_SERVER_ERROR', {message: 'Failed to create event'}),
        };
    }
}

export async function getUserEvents(): Promise<IActionState> {
    try {
        const session = await auth.api.getSession({headers: await headers()});
        const events = await prisma.events.findMany({where: {userId: session?.user.id}});
        return {success: true, data: events};
    } catch (error: any) {
        console.log(error);
        const appError = new AppError();
        return {success: false, error: appError};
    }
}
