'use server';

import {_statusCode} from 'better-auth';
import lodashGet from 'lodash/get';
import {headers as nextHeaders} from 'next/headers';
import {Prisma} from '@/app/generated/client';
import {auth} from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import {eventsSchema} from '@/lib/db/schema';
import {AppError} from '@/lib/error';
import {ValidationError} from '@/lib/error';
import {IActionState} from '@/types/utils/ActionState';
import {getLimitFromPageParam, getPageFromPageParam} from '@/utils/filters';
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
    const filters = JSON.parse(lodashGet(params, 'filters', '{}'));
    const categoryFilters = lodashGet(filters, 'categories', [] as string[]);
    return {
        ...(params?.q && {
            OR: [
                {title: {contains: params?.q, mode: Prisma.QueryMode.insensitive}},
                {description: {contains: params?.q, mode: Prisma.QueryMode.insensitive}},
            ],
        }),
        ...(categoryFilters.length > 0 && {
            category: {
                name: {in: categoryFilters},
            },
        }),
    };
}

export type GetUserEventsFunctionParams = Awaited<EventsPageProps['searchParams']>;

export type GetUserEventsReturn = Awaited<ReturnType<typeof getUserEvents>>;
export async function getUserEvents(params: GetUserEventsFunctionParams) {
    try {
        const headers = await nextHeaders();
        const session = await auth.api.getSession({headers});

        const page = getPageFromPageParam(params);
        const limit = getLimitFromPageParam(params, '12');

        const whereClause = buildUserEventsWhere(params);
        const [total, events] = await Promise.all([
            await prisma.events.count({
                where: {
                    userId: session?.user.id,
                    ...whereClause,
                },
            }),
            await prisma.events.findMany({
                where: {userId: session?.user.id, ...whereClause},
                include: {category: true},
                take: limit,
                skip: (page - 1) * limit,
            }),
        ]);

        return {success: true, data: {total, events}};
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

async function buildAuthenticatedUserWhere() {
    const headers = await nextHeaders();
    const session = await auth.api.getSession({headers});

    return {
        userId: session?.user.id,
    };
}

export type DashboardStatisticsState = {
    totalEvents: number;
    totalPastEvents: number;
    totalUpcommingEvents: number;
    totalUniqueEventCategories: number;
    averagePriceForTicket: number | null;
};
export type GetDashboardStatisticsReturn = Awaited<ReturnType<typeof getDashboardStatistics>>;
export async function getDashboardStatistics(): Promise<IActionState<DashboardStatisticsState>> {
    try {
        const authenticatedUserWhere = await buildAuthenticatedUserWhere();

        const [
            totalEvents,
            totalPastEvents,
            totalUpcommingEvents,
            uniqueCategories,
            averagePriceForTicket,
        ] = await Promise.all([
            await prisma.events.count({where: {...authenticatedUserWhere}}), // all events
            await prisma.events.count({
                where: {...authenticatedUserWhere, date: {lt: new Date()}},
            }), // past events
            await prisma.events.count({
                where: {...authenticatedUserWhere, date: {gt: new Date()}},
            }), // future events
            await prisma.events.groupBy({
                by: ['categoryId'],
                where: {...authenticatedUserWhere},
            }),
            (await prisma.events.aggregate({_avg: {price: true}}))._avg.price,
        ]);

        return {
            success: true,
            data: {
                totalEvents,
                totalPastEvents,
                totalUpcommingEvents,
                totalUniqueEventCategories: uniqueCategories.length,
                averagePriceForTicket,
            },
        };
    } catch (error) {
        return {success: false};
    }
}
