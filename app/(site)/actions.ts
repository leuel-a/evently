'use server';

import type {PageProps} from '@/app/(site)/page';
import {Events} from '@/app/generated/client';
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
                OR: [
                    {title: {contains: params?.q, mode: 'insensitive'}},
                    {description: {contains: params?.q, mode: 'insensitive'}},
                ],
                category: {
                    name: {
                        ...(categoriesFilters.length > 0 && {in: categoriesFilters}),
                    },
                },
            },
        });
        console.log({events});
        return {success: true, data: events};
    } catch (error) {
        const appError = new AppError('INTERNAL_SERVER_ERROR', {
            message: 'Something went wrong fetching events.',
        });
        return {success: false, error: appError};
    }
}
