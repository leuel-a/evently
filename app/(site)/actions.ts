'use server';

import type {PageProps} from '@/app/(site)/page';
import {Events, Prisma} from '@/app/generated/client';
import prisma from '@/lib/db/prisma';
import {AppError} from '@/lib/error';
import {PaginatedData} from '@/types/utils';
import {IActionState} from '@/types/utils/ActionState';
import {getCategoriesFilterFromSearchParams} from '@/utils';

type GetEvensFunctionProps = Awaited<PageProps['searchParams']>;

export async function getEvents(
    params: GetEvensFunctionProps,
): Promise<IActionState<PaginatedData<Events[]>>> {
    try {
        const page = parseInt(params?.page ?? '1');
        const limit = parseInt(params?.limit ?? '6');

        const categoriesFilters = getCategoriesFilterFromSearchParams(params?.categories);
        const [total, events] = await Promise.all([
            await prisma.events.count(),
            await prisma.events.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    ...(params?.q && {
                        OR: [
                            {title: {contains: params?.q, mode: Prisma.QueryMode.insensitive}},
                            {
                                description: {
                                    contains: params?.q,
                                    mode: Prisma.QueryMode.insensitive,
                                },
                            },
                        ],
                    }),
                    category: {
                        name: {
                            ...(categoriesFilters.length > 0 && {in: categoriesFilters}),
                        },
                    },
                },
            }),
        ]);
        return {success: true, data: {data: events, total}};
    } catch (error) {
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
        const appError = new AppError('INTERNAL_SERVER_ERROR', {
            message: 'Something went wrong while trying to get the event',
        });
        return {success: false, error: appError};
    }
}
