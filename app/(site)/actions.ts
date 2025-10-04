'use server';

import lodashGet from 'lodash/get';
import {headers} from 'next/headers';
import type {PageProps} from '@/app/(site)/events/page';
import {Events, Prisma} from '@/app/generated/client';
import {auth} from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import {AppError} from '@/lib/error';
import {PaginatedData} from '@/types/utils';
import {IActionState} from '@/types/utils/ActionState';
import {getLimitFromPageParam, getPageFromPageParam} from '@/utils/filters';

export type GetEvensFunctionProps = Awaited<PageProps['searchParams']>;

function buildEventsWhere(params: Awaited<PageProps['searchParams']>) {
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

export async function getEvents(
    params: GetEvensFunctionProps,
): Promise<IActionState<PaginatedData<Events[]>>> {
    try {
        const page = getPageFromPageParam(params);
        const limit = getLimitFromPageParam(params);

        const whereClause = buildEventsWhere(params);
        const [total, events] = await Promise.all([
            await prisma.events.count({where: whereClause}),
            await prisma.events.findMany({
                where: whereClause,
                include: {category: true},
                take: limit,
                skip: (page - 1) * limit,
            }),
        ]);

        return {success: true, data: {data: events, total}};
    } catch (error: any) {
        const appError = new AppError('INTERNAL_SERVER_ERROR', {
            message: 'Something went wrong fetching events.',
        });
        return {success: false, error: appError};
    }
}

export async function getEventById(id: string): Promise<IActionState<Events | null>> {
    try {
        const event = await prisma.events.findUnique({where: {id}});
        return {success: true, data: event};
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code, error.meta);
        }
        const appError = new AppError('INTERNAL_SERVER_ERROR', {
            message: 'Something went wrong while trying to get the event',
        });
        return {success: false, error: appError};
    }
}

export async function getAuthenticatedUser(): Promise<IActionState> {
    try {
        const session = await auth.api.getSession({headers: await headers()});
        return {success: true, data: session};
    } catch (error: any) {
        const appError = new AppError('INTERNAL_SERVER_ERROR', {
            message: 'Unable to get current session',
        });
        return {success: false, error: appError};
    }
}
