'use client';

import type {ColumnDef} from '@tanstack/react-table';
import {FileText, Clock} from 'lucide-react';
import type {IEventsCategory} from '@/types/eventsCategory'; // adjust import path as needed

export const columns: ColumnDef<IEventsCategory>[] = [
    {
        accessorKey: 'name',
        header: () => <div className="px-4">Category</div>,
        cell: ({row}) => (
            <div className="px-4 py-2 flex items-center gap-2">
                <span className="font-medium text-gray-900">{row.getValue('name')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'description',
        header: () => <div>Description</div>,
        cell: ({row}) => (
            <div className="flex items-center gap-2 text-gray-600 max-w-xs">
                <FileText className="w-4 h-4 shrink-0 text-gray-400" />
                <span className="line-clamp-2 text-sm">{row.getValue('description')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: () => <div>Created At</div>,
        cell: ({row}) => {
            const date = new Date(row.getValue<string>('createdAt'));
            return (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</span>
                </div>
            );
        },
    },
];
