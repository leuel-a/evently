'use client';

import {type PropsWithChildren} from 'react';
import {GetDashboardPageDataResult} from '@/app/dashboard/actions';
import {EventsByCategoryContext} from '@/context/EventsByCategoryContext';

interface Props extends PropsWithChildren {
    totalEvents: number;
    categories: GetDashboardPageDataResult['categories'];
}

export function EventsByCategoryProvider({children, totalEvents, categories}: Props) {
    return (
        <EventsByCategoryContext value={{totalEvents, categories}}>
            {children}
        </EventsByCategoryContext>
    );
}
