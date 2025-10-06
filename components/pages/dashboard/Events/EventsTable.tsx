import {Fragment} from 'react';
import type {GetUserEventsReturn} from '@/app/dashboard/actions';
import {columns} from '@/app/dashboard/events/columns';
import {DataTable} from '@/components/blocks/DataTable';

interface EventsTableProps {
    events: NonNullable<GetUserEventsReturn['data']>['events'];
}

export function EventsTable({events}: EventsTableProps) {
    return (
        <Fragment>
            <DataTable
                columns={columns}
                data={events ?? []}
            />
        </Fragment>
    );
}
