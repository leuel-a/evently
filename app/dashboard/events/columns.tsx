'use client';

import type {ColumnDef} from '@tanstack/react-table';
import {format} from 'date-fns';
import Link from 'next/link';
import type {Events} from '@/app/generated/client';
import {Badge} from '@/components/ui/badge';
import {APP_ROUTES} from '@/config/routes';

export const columns: ColumnDef<Events>[] = [
    {id: 'none'},
    {accessorKey: 'title', header: 'Title'},
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
            <Badge variant={row.getValue('isVirtual') ? 'outline' : 'default'}>
                {row.getValue('isVirtual') == 'true' ? 'Virtual' : 'In-Person'}
            </Badge>
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
