import {createContext, useContext} from 'react'
import {GetDashboardPageDataResult} from '@/app/dashboard/actions';

interface EventsByCategoryContextValue {
    totalEvents: number;
    categories: GetDashboardPageDataResult['categories'];
}

export const EventsByCategoryContext = createContext<EventsByCategoryContextValue | null>(null);

export function useEventsByCategory() {
    const ctx = useContext(EventsByCategoryContext);
    if (!ctx) throw new Error('useEventsByCategory must be used inside EventsByCategoryContext');
    return ctx;
}
