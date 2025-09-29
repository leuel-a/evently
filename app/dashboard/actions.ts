'use server';

import {_statusCode} from 'better-auth';
import {headers as nextHeaders, cookies as nextCookies} from 'next/headers';
import {Prisma} from '@/app/generated/client';
import type {Events} from '@/app/generated/client';
import {auth} from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import {eventsSchema} from '@/lib/db/schema';
import {AppError} from '@/lib/error';
import {ValidationError} from '@/lib/error';
import {IActionState} from '@/types/utils/ActionState';
import {convertFormDataToObject} from '@/utils/functions';
import logger from '@/utils/logger';
import {PageProps as EventsPageProps} from './events/page';

export async function createEventAction(formData: FormData) {
    const values = convertFormDataToObject(formData);
    const headers = await nextHeaders();
    const session = await auth.api.getSession({headers});

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

type GetUserEventsFunction = Awaited<EventsPageProps['searchParams']>;

function buildUserEventsWhere(params: GetUserEventsFunction) {
    return {
        ...(params?.q && {
            OR: [
                {title: {contains: params?.q, mode: Prisma.QueryMode.insensitive}},
                {description: {contains: params?.q, mode: Prisma.QueryMode.insensitive}},
            ],
        }),
    };
}

export async function getUserEvents(
    params: GetUserEventsFunction,
): Promise<IActionState<Events[]>> {
    try {
        const headers = await nextHeaders();
        const session = await auth.api.getSession({headers});

        const whereClause = buildUserEventsWhere(params);
        const events = await prisma.events.findMany({
            where: {userId: session?.user.id, ...whereClause},
        });

        return {success: true, data: events};
    } catch (error: any) {
        const appError = new AppError();
        return {success: false, error: appError};
    }
}
