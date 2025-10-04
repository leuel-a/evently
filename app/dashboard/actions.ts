'use server';

import {_statusCode} from 'better-auth';
import {headers as nextHeaders} from 'next/headers';
import {Prisma} from '@/app/generated/client';
import type {EventsCategory, Events} from '@/app/generated/client';
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

function buildUserEventsWhere(params: GetUserEventsFunctionParams) {
    return {
        ...(params?.q && {
            OR: [
                {title: {contains: params?.q, mode: Prisma.QueryMode.insensitive}},
                {description: {contains: params?.q, mode: Prisma.QueryMode.insensitive}},
            ],
        }),
    };
}

export type GetUserEventsFunctionParams = Awaited<EventsPageProps['searchParams']>;

export type GetUserEventsReturn = Awaited<ReturnType<typeof getUserEvents>>;
export async function getUserEvents(params: GetUserEventsFunctionParams) {
    try {
        const headers = await nextHeaders();
        const session = await auth.api.getSession({headers});

        const whereClause = buildUserEventsWhere(params);
        const events = await prisma.events.findMany({
            where: {userId: session?.user.id, ...whereClause},
            include: {category: true},
        });

        return {success: true, data: events};
    } catch (error: any) {
        const appError = new AppError();
        return {success: false, error: appError};
    }
}

export type GetUserEventsCategoriesReturn = Awaited<ReturnType<typeof getUserEventsCategories>>;
export async function getUserEventsCategories() {
    try {
        const headers = await nextHeaders();
        const session = await auth.api.getSession({headers});

        const events = await prisma.events.findMany({
            where: {userId: session?.user.id},
            select: {category: true},
        });

        return {success: true, data: events.map(({category}) => category)};
    } catch (error: any) {
        const appError = new AppError();
        return {success: true, error: appError};
    }
}
