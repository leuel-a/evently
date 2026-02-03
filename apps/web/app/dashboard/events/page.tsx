'use client';

import type {IEvent} from '@/types';
import {DataTable as EventTable} from './data-table';
import {columns} from './columns';
import {type QueryFunction, useQuery} from '@tanstack/react-query';
import {FilterEventsTable} from '@/components/pages/dashboard/FilterEventsTable';

export type EventResponse = {
    data: IEvent[];
    page: number;
    limit: number;
};

export type SettingsApiResponse = {
    category: {
        all: {id: string; name: string}[];
        active: {id: string; name: string}[];
    };
};

export default function Page() {
    const fetchEvents: QueryFunction<EventResponse, ['events']> = async () => {
        const response = await fetch('/api/events');

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        return response.json();
    };

    const getSettings: QueryFunction<SettingsApiResponse, ['settings']> = async () => {
        const response = await fetch('/api/settings');

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        return response.json();
    };

    const {
        data: events,
        isPending: isPendingEvent,
        isError: isErrorEvent,
    } = useQuery({queryKey: ['events'], queryFn: fetchEvents});

    const {data: settings} = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,
    });

    return (
        <div className="mx-auto py-10">
            <FilterEventsTable categories={settings?.category?.all || []} />
            {isErrorEvent && <div>Something wen't wrong while trying to fetch.</div>}
            {isPendingEvent ? (
                <div>Loading</div>
            ) : (
                <EventTable data={events?.data || []} columns={columns} />
            )}
        </div>
    );
}
