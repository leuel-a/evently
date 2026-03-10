'use client';
import {Mail, User, CreditCard, Ticket as TicketIcon, Wallet, Hash} from 'lucide-react';
import {ColumnDef} from '@tanstack/react-table';
import {type ITicket, TICKET_STATUS} from '@/types/tickets';
import {Badge} from '@/components/ui/badge';
import {Select, SelectContent, SelectItem, SelectTrigger} from '@/components/ui/select';
import {SelectTicketStatus} from '@/components/pages/Dashboard/Settings/General/SelectTicketStatus';

export const columns: ColumnDef<ITicket>[] = [
    {
        accessorKey: 'purchaserName',
        header: () => {
            return <div className="px-4">Purchaser</div>;
        },
        cell: ({row}) => {
            return (
                <div className="px-4 py-2 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-700" />
                        <span className="text-sm font-medium text-gray-900">
                            {row.original.purchaserName}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{row.original.purchaserEmail}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'event',
        header: () => {
            return <div>Event</div>;
        },
        cell: ({row}) => {
            return (
                <div className="flex items-center gap-2 max-w-[220px]">
                    <TicketIcon className="w-4 h-4 text-gray-700 shrink-0" />
                    <span className="text-sm text-gray-800 truncate">
                        {row.original.event.title}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'paymentId',
        header: () => {
            return <div>Payment</div>;
        },
        cell: ({row}) => {
            return (
                <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-mono text-gray-800">
                        {row.original.paymentId}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'amountPaid',
        header: () => {
            return <div>Amount</div>;
        },
        cell: ({row}) => {
            const amount = row.original.amountPaid;
            const currency = row.original.currency;

            return amount === 0 ? (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600 rounded">
                    Free
                </Badge>
            ) : (
                <div className="inline-flex items-center gap-2 px-2 py-1 border border-input bg-gray-100 rounded text-sm font-semibold text-gray-800">
                    <Wallet className="w-4 h-4" />
                    <span>
                        {currency} {amount}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'currency',
        header: () => {
            return <div>Currency</div>;
        },
        cell: ({row}) => {
            return (
                <Badge variant="outline" className="rounded px-2 py-1 font-medium">
                    {row.original.currency}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'status',
        header: () => <SelectTicketStatus />,
        cell: ({row}) => {
            const status = row.original.status;

            const statusMap: Record<ITicket['status'], {label: string; className: string}> = {
                PAID: {
                    label: 'PAID',
                    className: 'bg-green-100 text-green-800',
                },
                REFUNDED: {
                    label: 'REFUNDED',
                    className: 'bg-red-100 text-red-800',
                },
                PENDING: {
                    label: 'PENDING',
                    className: 'bg-yellow-100 text-yellow-800',
                },
            };

            const currentStatus = statusMap[status];

            return (
                <Badge className={currentStatus?.className}>
                    <div className="flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{currentStatus?.label}</span>
                    </div>
                </Badge>
            );
        },
    },
];
