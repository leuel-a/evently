'use server';

import type {PageProps} from '@/app/(site)/page';
import {Events, Prisma} from '@/app/generated/client';
import prisma from '@/lib/db/prisma';
import {AppError} from '@/lib/error';
import {IActionState} from '@/types/utils/ActionState';
import {getCategoriesFilterFromSearchParams} from '@/utils';

type GetEvensFunctionProps = Awaited<PageProps['searchParams']>;

export async function getEvents(params: GetEvensFunctionProps): Promise<IActionState<Events[]>> {
    try {
        const categoriesFilters = getCategoriesFilterFromSearchParams(params?.categories);
        const events = await prisma.events.findMany({
            where: {
                ...(params?.q && {
                    OR: [
                        {title: {contains: params?.q, mode: Prisma.QueryMode.insensitive}},
                        {description: {contains: params?.q, mode: Prisma.QueryMode.insensitive}},
                    ],
                }),
                category: {
                    name: {
                        ...(categoriesFilters.length > 0 && {in: categoriesFilters}),
                    },
                },
            },
        });
        return {success: true, data: events};
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
