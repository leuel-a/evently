'use client';

import type {ColumnDef} from '@tanstack/react-table';
import lodashGet from 'lodash/get';
import {Monitor, MapPin, Clock, Calendar, Users} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {formatDate} from '@/utils/date';
import {countries} from '@/utils/index';
import {EVENT_STATUS, type IEvent} from '@/types/events';
import {cn} from '@/lib/utils';
import {EditEventAction} from '@/components/pages/Dashboard/Events/EditEventAction';

export const columns: ColumnDef<IEvent>[] = [
    {
        accessorKey: 'title',
        header: () => {
            return <div className="px-8">Events</div>;
        },
        cell: ({row}) => {
            return (
                <div className="px-8 py-2 flex flex-col">
                    <div>
                        <span className="text-lg font-medium">{row.getValue('title')}</span>
                    </div>
                    <div className="text-gray-500 select-none line-clamp-2 max-w-140">
                        {row.original.description}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'date',
        header: () => {
            return <div className="">{'Date & Time'}</div>;
        },
        cell: ({row}) => {
            return (
                <div className="text-gray-800 flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Calendar className="w-4 h-4 text-gray-800" />
                        <span>{formatDate(row.getValue('date'))}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Clock className="w-4 h-4 text-gray-800" />
                        <span>
                            {row.original.startTime} - {row.original.endTime}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'address',
        header: () => {
            return <div>Location</div>;
        },
        cell: ({row}) => {
            if (row.original.isVirtual) {
                return (
                    <div className="flex gap-2 items-center">
                        <Monitor className="w-5 h-5 text-gray-800" />
                        <span className="text-gray-800">{'Virtual Event'}</span>
                    </div>
                );
            }

            return (
                <div>
                    <div className="flex gap-2 items-center">
                        <MapPin className="w-5 h-5" />
                        <span className="text-gray-800">{row.original.address}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'country',
        header: 'Country',
        cell: ({row}) => {
            const country = countries.find((country) => country?.value === row.getValue('country'));
            return <div>{country?.label}</div>;
        },
    },
    {
        accessorKey: 'ticketPrice',
        header: 'Price',
        cell: ({row}) => {
            const isFree = lodashGet(row.original, 'isFree', false);
            const price = row.getValue('ticketPrice') as number;

            return isFree ? (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600 rounded">
                    Free
                </Badge>
            ) : (
                <span className="inline-flex items-center px-2 py-1 border border-input text-sm font-semibold text-gray-700 bg-gray-100 rounded">
                    <span className="mr-1">Br</span>
                    {price}
                </span>
            );
        },
    },
    {
        accessorKey: 'category',
        header: () => {
            return <div>{'Category'}</div>;
        },
        cell: ({row}) => {
            return (
                <div>
                    <Badge variant="outline" className="px-2 py-1 text-md rounded font-medium">
                        {row.original.category.name}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: 'capacity',
        header: () => {
            return <div>{'Capacity'}</div>;
        },
        cell: ({row}) => {
            return (
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                        {row.original.capacity} <span className="text-gray-700 text-sm">max</span>
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'isVirtual',
        header: 'Type',
        cell: ({row}) => {
            const isVirtual = row.getValue<boolean>('isVirtual');

            return (
                <Badge
                    variant={isVirtual ? 'secondary' : 'default'}
                    className={
                        isVirtual ? 'bg-amber-100 text-amber-800' : 'bg-cyan-100 text-cyan-800'
                    }
                >
                    {isVirtual ? 'Virtual' : 'On-Site'}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({row}) => {
            // ACTIVE, DRAFT, CLOSED
            const status = row.getValue('status') as string;
            return (
                <Badge
                    className={cn(
                        'capitalize',
                        status === EVENT_STATUS.DRAFT
                            ? 'bg-gray-200 text-gray-800'
                            : status === EVENT_STATUS.ACTIVE
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800',
                    )}
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({row}) => <EditEventAction row={row} />,
    },
];
