import {columns} from '@/app/dashboard/events/columns';
import type {Events} from '@/app/generated/client';
import {DataTable} from '@/components/blocks/DataTable';

interface EventsTableProps {
    events: Events[];
}

export function EventsTable({events}: EventsTableProps) {
    return (
        <DataTable
            columns={columns}
            data={events ?? []}
        />
    );
}
