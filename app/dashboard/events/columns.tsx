'use client';

import type {ColumnDef} from '@tanstack/react-table';
import {format} from 'date-fns';
import Link from 'next/link';
import type {Events} from '@/app/generated/client';
import {Badge} from '@/components/ui/badge';
import {Checkbox} from '@/components/ui/checkbox';
import {APP_ROUTES} from '@/config/routes';

export const columns: ColumnDef<Events>[] = [
    {
        id: 'select',
        header: ({table}) => (
            <Checkbox
                checked={table.getIsAllRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all events"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label={`Select event ${row.getValue('title')}`}
            />
        ),
    },
    {accessorKey: 'title', header: 'Title'},
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({row}) => {
            const description: string = row.getValue('description');
            return (
                <div
                    className="truncate w-96"
                    title={description}
                >
                    {description}
                </div>
            );
        },
    },
    {
        accessorKey: 'date',
        header: 'Date',
        cell: ({row}) => {
            const date: string = row.getValue('date');
            return format(new Date(date), 'MMMM dd, yyyy');
        },
    },
    {accessorKey: 'startTime', header: 'Start Time'},
    {accessorKey: 'endTime', header: 'End Time'},
    {
        accessorKey: 'capacity',
        header: () => <div className="text-center">Capacity</div>,
        cell: ({row}) => <div className="text-center">{row.getValue('capacity')}</div>,
    },
    {
        accessorKey: 'isVirtual',
        header: 'Type',
        cell: ({row}) => (
            <Badge variant={row.getValue('isVirtual') ? 'outline' : 'default'}>{row.getValue('isVirtual') ? 'Virtual' : 'In-Person'}</Badge>
        ),
    },
    {
        id: 'actions',
        cell: ({row}) => {
            const event = row.original;
            return (
                <Link
                    href={`${APP_ROUTES.dashboard.events.base}/${event.id}`}
                    className="font-medium underline text-indigo-600 hover:underline"
                >
                    View
                </Link>
            );
        },
    },
];
