import type {ColumnDef} from '@tanstack/react-table';
import type {Events} from '@/app/generated/client';

export const columns: ColumnDef<Events>[] = [
    {accessorKey: 'title', header: 'Title'},
    {accessorKey: 'description', header: 'Description'},
    {accessorKey: 'date', header: 'Date'},
    {accessorKey: 'startTime', header: 'Start Time'},
    {accessorKey: 'endTime', header: 'End Time'},
    {accessorKey: 'capacity', header: 'Capacity'},
    {accessorKey: 'isVirtual', header: 'Is Virtual'},
];
