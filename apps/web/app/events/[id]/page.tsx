'use client';

import {useParams, useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {CalendarDays, Clock, MapPin, Globe, Users, Tag, ArrowRight, Ticket} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {Skeleton} from '@/components/ui/skeleton';
import {formatDate} from '@/utils/date';
import {makeApiCall} from '@/config/api';

async function fetchEvent(id: string): Promise<Event> {
    const res = await makeApiCall(`/api/events/${id}`);
    if (!res.ok) throw new Error('Failed to fetch event');
    const data = await res.json();
    return data.event ?? data;
}

function formatPrice(price: number) {
    if (price === 0) return 'Free';
    return `ETB ${price.toLocaleString()}`;
}

function statusColor(status: string) {
    return (
        {
            active: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
            draft: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
            closed: 'bg-red-500/10 text-red-600 border-red-200',
        }[status] ?? 'bg-muted text-muted-foreground'
    );
}

function typeLabel(type: string) {
    return {physical: 'In Person', virtual: 'Virtual', hybrid: 'Hybrid'}[type] ?? type;
}

function EventPageSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            <div className="h-64 bg-muted w-full" />
            <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    );
}

// TODO: just make this a server component
export default function PublicEventPage() {
    const {id} = useParams<{id: string}>();
    const router = useRouter();

    const {
        data: event,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['public-event', id],
        queryFn: () => fetchEvent(id),
        enabled: !!id,
    });

    if (isLoading) return <EventPageSkeleton />;

    if (isError || !event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-4">
                <Ticket className="w-10 h-10 text-muted-foreground" />
                <h1 className="text-xl font-semibold">Event not found</h1>
                <p className="text-muted-foreground text-sm">
                    This event may have been removed or the link is incorrect.
                </p>
            </div>
        );
    }

    const isFree = event.ticketPrice === 0;
    const isClosed = event.status === 'closed';
    const isVirtual = event.type === 'virtual';
    const isHybrid = event.type === 'hybrid';

    return (
        <div className="min-h-screen bg-background">
            {/* Cover — placeholder gradient until cover image is added */}
            <div className="w-full h-56 md:h-72 bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-end">
                <div className="max-w-3xl mx-auto w-full px-4 pb-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`text-xs border ${statusColor(event.status)}`}>
                            {event.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {typeLabel(event.type)}
                        </Badge>
                        {event.category?.name && (
                            <Badge variant="outline" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {event.category.name}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
                {/* Title */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 shrink-0 text-primary" />
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 shrink-0 text-primary" />
                        <span>
                            {event.startTime} – {event.endTime}
                        </span>
                    </div>
                    {(event.location || event.address) && (
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 shrink-0 text-primary" />
                            <span>
                                {event.address || event.location}, {event.country}
                            </span>
                        </div>
                    )}
                    {(isVirtual || isHybrid) && event.virtualUrl && (
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 shrink-0 text-primary" />
                            <a
                                href={event.virtualUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-2 hover:text-foreground transition-colors truncate"
                            >
                                {event.virtualUrl}
                            </a>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 shrink-0 text-primary" />
                        <span>{event.capacity.toLocaleString()} capacity</span>
                    </div>
                </div>

                <Separator />

                {/* Description */}
                <div className="space-y-2">
                    <h2 className="font-semibold text-base">About this event</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {event.description}
                    </p>
                </div>

                <Separator />

                {/* Ticket CTA */}
                <div className="rounded-xl border bg-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                            Ticket price
                        </p>
                        <p className="text-2xl font-bold">{formatPrice(event.ticketPrice)}</p>
                        {isFree && (
                            <p className="text-xs text-muted-foreground">No payment required</p>
                        )}
                    </div>

                    <Button
                        size="lg"
                        disabled={isClosed}
                        className="w-full sm:w-auto gap-2"
                        onClick={() => router.push(`/events/${id}/checkout`)}
                    >
                        {isClosed ? 'Event Closed' : isFree ? 'Reserve a Spot' : 'Get Ticket'}
                        {!isClosed && <ArrowRight className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
