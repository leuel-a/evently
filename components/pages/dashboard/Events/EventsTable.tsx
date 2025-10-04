import type {GetUserEventsReturn} from '@/app/dashboard/actions';
import {columns} from '@/app/dashboard/events/columns';
import type {Events} from '@/app/generated/client';
import {DataTable} from '@/components/blocks/DataTable';

interface EventsTableProps {
    events: GetUserEventsReturn['data'];
}

export function EventsTable({events}: EventsTableProps) {
    return (
        <DataTable
            columns={columns}
            data={events ?? []}
        />
    );
}
