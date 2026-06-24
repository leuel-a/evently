'use client';

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {IEvent, EVENT_STATUS} from '@/types/events';
import {Clock, Globe, MapPin, Monitor, Ticket, Users, ArrowRight} from 'lucide-react';

interface EventCardProps {
    event: IEvent;
}

function formatDate(date: Date) {
    const d = new Date(date);
    return {
        day: d.toLocaleDateString('en-US', {weekday: 'short'}),
        date: d.getDate(),
        month: d.toLocaleDateString('en-US', {month: 'short'}),
        year: d.getFullYear(),
        full: d.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }),
    };
}

function formatPrice(price: number, isFree: boolean) {
    if (isFree) return 'Free';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(price);
}

const statusConfig: Record<string, {label: string; className: string}> = {
    [EVENT_STATUS.ACTIVE]: {
        label: 'Active',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    [EVENT_STATUS.DRAFT]: {
        label: 'Draft',
        className: 'bg-zinc-100 text-zinc-500 border-zinc-200',
    },
    [EVENT_STATUS.CLOSED]: {
        label: 'Closed',
        className: 'bg-red-50 text-red-600 border-red-200',
    },
};

export function EventCard({event}: EventCardProps) {
    const {
        title,
        description,
        date,
        startTime,
        endTime,
        address,
        country,
        isVirtual,
        isFree,
        ticketPrice,
        capacity,
        category,
        checkoutLink,
        status,
    } = event;

    const formatted = formatDate(date);
    const statusStyle = statusConfig[status] ?? {
        label: status,
        className: 'bg-zinc-100 text-zinc-500 border-zinc-200',
    };
    const categoryName = typeof category === 'object' ? category?.name : category;
    const isDisabled = status === EVENT_STATUS.CLOSED || status === EVENT_STATUS.DRAFT;

    return (
        <div className="flex h-44 rounded-lg border border-slate-200 bg-white overflow-hidden hover:border-indigo-300 transition-colors duration-150">
            <div className="hidden sm:flex flex-col items-center justify-center w-20 shrink-0 border-r border-slate-200 bg-slate-50 py-5 gap-0">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {formatted.day}
                </span>
                <span className="text-3xl font-bold text-slate-800 leading-tight">
                    {formatted.date}
                </span>
                <span className="text-xs font-medium text-slate-500 uppercase">
                    {formatted.month}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">{formatted.year}</span>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-3 px-5 py-4 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        {categoryName && (
                            <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                                {categoryName}
                            </span>
                        )}
                        <span className="text-slate-300 text-xs">·</span>
                        <span className="text-xs text-slate-400">
                            {isVirtual ? (
                                <span className="flex items-center gap-1">
                                    <Monitor className="h-3 w-3" /> Virtual
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" /> In-person
                                </span>
                            )}
                        </span>
                    </div>
                    <Badge
                        variant="outline"
                        className={`text-[11px] font-medium shrink-0 ${statusStyle.className}`}
                    >
                        {statusStyle.label}
                    </Badge>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-slate-900 line-clamp-1 leading-snug">
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {startTime} – {endTime}
                    </span>
                    <span className="flex items-center gap-1">
                        {isVirtual ? (
                            <Globe className="h-3.5 w-3.5 text-slate-400" />
                        ) : (
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        )}
                        <span className="truncate max-w-48">
                            {isVirtual ? 'Online' : `${address}, ${country}`}
                        </span>
                    </span>
                    <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-slate-400" />
                        {capacity.toLocaleString()} seats
                    </span>
                </div>
            </div>

            <div className="hidden md:flex flex-col items-end justify-between shrink-0 px-5 py-4 border-l border-slate-200 min-w-35">
                <div className="text-right">
                    <p className="flex items-center justify-end gap-1 text-[11px] text-slate-400 mb-0.5">
                        <Ticket className="h-3 w-3" /> ticket
                    </p>
                    <p
                        className={`text-xl font-bold ${
                            isFree ? 'text-emerald-600' : 'text-slate-900'
                        }`}
                    >
                        {formatPrice(ticketPrice, isFree)}
                    </p>
                </div>

                <Button
                    size="sm"
                    disabled={isDisabled}
                    onClick={() => checkoutLink && window.open(checkoutLink, '_blank')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-md gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isDisabled ? (
                        status === EVENT_STATUS.CLOSED ? (
                            'Closed'
                        ) : (
                            'Unavailable'
                        )
                    ) : (
                        <>
                            Get Tickets <ArrowRight className="h-3 w-3" />
                        </>
                    )}
                </Button>
            </div>

            <div className="flex md:hidden items-center justify-between border-t border-slate-100 px-5 py-3">
                <p
                    className={`text-base font-bold ${
                        isFree ? 'text-emerald-600' : 'text-slate-900'
                    }`}
                >
                    {formatPrice(ticketPrice, isFree)}
                </p>
                <Button
                    size="sm"
                    disabled={isDisabled}
                    onClick={() => checkoutLink && window.open(checkoutLink, '_blank')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-md gap-1 disabled:opacity-40"
                >
                    Get Tickets <ArrowRight className="h-3 w-3" />
                </Button>
            </div>
        </div>
    );
}
