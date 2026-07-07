import NextLink from 'next/link';
import {
    CalendarDays,
    Clock,
    MapPin,
    Globe,
    Users,
    Tag,
    ArrowRight,
    Ticket,
    AlertCircle,
} from 'lucide-react';
import {APP_ROUTES} from '@/config/routes';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {formatDate} from '@/utils/date';
import {typeLabel, formatPrice, StatusPip} from './utils';
import {getEvent} from '../actions';

interface PageProps {
    params: Promise<{id: string}>;
}

export default async function Page(props: PageProps) {
    const {id} = await props.params;
    const {error, data} = await getEvent(id);

    if (error || !data?.data) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-indigo-950 px-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10">
                    <AlertCircle className="size-7 text-indigo-300" strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="font-serif text-2xl text-white">Event not found</h1>
                    <p className="mt-2 text-sm text-indigo-300/60">
                        This event may have been removed or the link is incorrect.
                    </p>
                </div>
                <NextLink
                    href={APP_ROUTES.events?.base ?? '/events'}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-indigo-400 underline-offset-2 hover:underline"
                >
                    Browse all events <ArrowRight className="size-3.5" />
                </NextLink>
            </div>
        );
    }

    const event = data.data;
    const isFree = event.ticketPrice === 0;
    const isClosed = event.status === 'closed';
    const isVirtual = event.type === 'virtual';
    const isHybrid = event.type === 'hybrid';

    return (
        <div className="min-h-screen bg-indigo-50">
            <section className="relative overflow-hidden bg-indigo-950 text-indigo-50">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />

                <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-20">
                    <div className="mb-8 flex items-center gap-2 text-xs text-indigo-400/60">
                        <NextLink
                            href={APP_ROUTES.events?.base ?? '/events'}
                            className="hover:text-indigo-300 transition-colors"
                        >
                            Events
                        </NextLink>
                        <span>/</span>
                        <span className="text-indigo-300/80 truncate max-w-[18rem]">
                            {String(event.title)}
                        </span>
                    </div>

                    <div className="mb-6 flex flex-wrap items-center gap-2">
                        <StatusPip status={event.status} />
                        <span className="inline-flex items-center gap-1 rounded-full border border-indigo-400/25 bg-indigo-400/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-indigo-300">
                            {typeLabel(event.type)}
                        </span>
                        {event.category?.name && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-400/25 bg-indigo-400/8 px-3 py-1 text-xs font-medium text-indigo-300">
                                <Tag className="size-3" />
                                {event.category.name}
                            </span>
                        )}
                    </div>

                    <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl">
                        {String(event.title)}
                    </h1>

                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <MetaRow icon={CalendarDays}>{formatDate(event.date)}</MetaRow>
                        <MetaRow icon={Clock}>
                            {String(event.startTime)} – {String(event.endTime)}
                        </MetaRow>
                        {(event.location || event.address) && (
                            <MetaRow icon={MapPin}>
                                {String(event.address || event.location)}, {String(event.country)}
                            </MetaRow>
                        )}
                        {(isVirtual || isHybrid) && event.virtualUrl && (
                            <MetaRow icon={Globe}>
                                <a
                                    href={String(event.virtualUrl)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline underline-offset-2 hover:text-white transition-colors truncate"
                                >
                                    {String(event.virtualUrl)}
                                </a>
                            </MetaRow>
                        )}
                        <MetaRow icon={Users}>
                            {Number(event.capacity).toLocaleString()} capacity
                        </MetaRow>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-3xl px-6 py-12 space-y-12">
                <section className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                        About this event
                    </p>
                    <p className="text-base leading-8 text-indigo-950/70 whitespace-pre-line">
                        {String(event.description)}
                    </p>
                </section>

                <Separator className="bg-indigo-100" />

                <section>
                    <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm shadow-indigo-100">
                        <div className="flex items-center gap-2 border-b border-dashed border-indigo-100 bg-indigo-50/60 px-6 py-3">
                            <Ticket className="size-4 text-indigo-300" strokeWidth={1.5} />
                            <span className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-400">
                                Ticket
                            </span>

                            <span
                                className="absolute left-0 size-4 -translate-x-1/2 rounded-full bg-indigo-50"
                                aria-hidden
                            />
                            <span
                                className="absolute right-0 size-4 translate-x-1/2 rounded-full bg-indigo-50"
                                aria-hidden
                            />
                        </div>

                        <div className="flex flex-col items-start justify-between gap-6 px-6 py-6 sm:flex-row sm:items-center">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-400">
                                    {isFree ? 'Free entry' : 'Ticket price'}
                                </p>
                                <p className="font-serif text-4xl text-indigo-950">
                                    {isFree ? 'Free' : formatPrice(event.ticketPrice)}
                                </p>
                                {isFree && (
                                    <p className="text-xs text-indigo-950/40">
                                        No payment required — just reserve your spot.
                                    </p>
                                )}
                            </div>

                            {isClosed ? (
                                <div className="flex flex-col items-start gap-1 sm:items-end">
                                    <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-400">
                                        Event closed
                                    </span>
                                    <p className="text-xs text-indigo-950/40">
                                        Ticket sales have ended.
                                    </p>
                                </div>
                            ) : (
                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-500 sm:w-auto"
                                >
                                    <NextLink
                                        href={`${APP_ROUTES.events.base}/${event.id}/checkout`}
                                    >
                                        {isFree ? 'Reserve a spot' : 'Get ticket'}
                                        <ArrowRight className="size-4" />
                                    </NextLink>
                                </Button>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function MetaRow({icon: Icon, children}: {icon: React.ElementType; children: React.ReactNode}) {
    return (
        <div className="flex items-start gap-2.5 text-sm text-indigo-200/75">
            <Icon className="mt-0.5 size-4 shrink-0 text-indigo-400" strokeWidth={1.5} />
            <span className="leading-snug">{children}</span>
        </div>
    );
}
