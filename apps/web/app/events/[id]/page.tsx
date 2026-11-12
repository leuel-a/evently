import NextLink from 'next/link';
import {
    CalendarDays,
    ChevronRight,
    Clock,
    ExternalLink,
    Globe,
    MapPin,
    Tag,
    Ticket,
    Users,
} from 'lucide-react';
import { APP_ROUTES } from '@/config/routes';
import { EventNotFound, EventTicketCta } from '@/components/pages/Public/Events';
import { formatDate } from '@/utils/date';
import { typeLabel, formatPrice, StatusPip } from './utils';
import { getEvent } from '../actions';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
    const { id } = await props.params;
    const { error, data } = await getEvent(id);

    if (error || !data?.data) {
        return <EventNotFound />;
    }

    const event = data.data;
    const isFree = event.ticketPrice === 0;
    const isClosed = event.status === 'closed';
    const isVirtual = event.type === 'virtual';
    const isHybrid = event.type === 'hybrid';
    const isInPerson = !isVirtual;

    const startsAt = new Date(event.date);
    const month = startsAt.toLocaleDateString('en-US', { month: 'short' });
    const day = startsAt.getDate();

    const hostName = getHostName(event.user);
    const venueLine = [event.address || event.location, event.country].filter(Boolean).join(', ');
    const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueLine)}`;
    const checkoutHref = `${APP_ROUTES.events.base}/${event.id}/checkout`;
    const priceLabel = isFree ? 'Free' : formatPrice(event.ticketPrice);

    return (
        <div className="min-h-screen bg-slate-50 pb-28 lg:pb-0">
            <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
                <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-500">
                    <NextLink
                        href={APP_ROUTES.events?.base ?? '/events'}
                        className="transition-colors hover:text-indigo-600"
                    >
                        Events
                    </NextLink>
                    <ChevronRight className="size-3.5 text-slate-300" />
                    <span className="max-w-[16rem] truncate text-slate-700">
                        {String(event.title)}
                    </span>
                </nav>

                <div className="relative h-44 overflow-hidden rounded bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 sm:h-60">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.10]"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '24px 24px',
                        }}
                    />
                    <div
                        aria-hidden
                        className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
                    />
                    <div className="absolute bottom-4 left-4 flex flex-col items-center rounded bg-white px-4 py-2 shadow-lg sm:bottom-6 sm:left-6">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                            {month}
                        </span>
                        <span className="text-3xl font-bold leading-none text-slate-900">
                            {day}
                        </span>
                    </div>
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <main className="min-w-0 space-y-10">
                        <header className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <StatusPip status={event.status} />
                                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                                    {typeLabel(event.type)}
                                </span>
                                {event.category?.name && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                        <Tag className="size-3" />
                                        {event.category.name}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                                {String(event.title)}
                            </h1>

                            <div className="flex items-center gap-3">
                                <Avatar name={hostName} />
                                <div className="text-sm leading-tight">
                                    <p className="text-slate-500">Hosted by</p>
                                    <p className="font-medium text-slate-900">{hostName}</p>
                                </div>
                            </div>
                        </header>

                        <section className="grid gap-4 sm:grid-cols-2">
                            <InfoCard icon={CalendarDays} label="Date and time">
                                <p className="font-medium text-slate-900">{formatDate(event.date)}</p>
                                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
                                    <Clock className="size-3.5" />
                                    {String(event.startTime)} – {String(event.endTime)}
                                </p>
                            </InfoCard>

                            <InfoCard icon={isInPerson ? MapPin : Globe} label="Location">
                                {isInPerson && venueLine && (
                                    <>
                                        <p className="font-medium text-slate-900">{venueLine}</p>
                                        <a
                                            href={mapsHref}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-0.5 inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                                        >
                                            View on map
                                            <ExternalLink className="size-3" />
                                        </a>
                                    </>
                                )}
                                {(isVirtual || isHybrid) && (
                                    <p
                                        className={`font-medium text-slate-900 ${isHybrid ? 'mt-2 border-t border-slate-100 pt-2' : ''}`}
                                    >
                                        {isHybrid ? 'Also streamed online' : 'Online event'}
                                        <span className="mt-0.5 block text-sm font-normal text-slate-500">
                                            Link shared after you register
                                        </span>
                                    </p>
                                )}
                            </InfoCard>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold text-slate-900">About this event</h2>
                            <p className="whitespace-pre-line text-base leading-7 text-slate-600">
                                {String(event.description)}
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold text-slate-900">Organizer</h2>
                            <div className="flex items-center gap-4 rounded border border-slate-200 bg-white p-5">
                                <Avatar name={hostName} size="lg" />
                                <div>
                                    <p className="font-semibold text-slate-900">{hostName}</p>
                                    <p className="text-sm text-slate-500">Event organizer</p>
                                </div>
                            </div>
                        </section>
                    </main>

                    <aside className="hidden lg:block">
                        <div className="sticky top-24 overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
                            <div className="space-y-5 p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                                            <Ticket className="size-3.5" />
                                            {isFree ? 'Free entry' : 'Ticket price'}
                                        </p>
                                        <p className="mt-1 text-4xl font-bold text-slate-900">
                                            {priceLabel}
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-600">
                                    <li className="flex items-center gap-2.5">
                                        <CalendarDays className="size-4 text-slate-400" />
                                        {formatDate(event.date)}
                                    </li>
                                    <li className="flex items-center gap-2.5">
                                        <Clock className="size-4 text-slate-400" />
                                        {String(event.startTime)} – {String(event.endTime)}
                                    </li>
                                    <li className="flex items-center gap-2.5">
                                        <Users className="size-4 text-slate-400" />
                                        {Number(event.capacity).toLocaleString()} spots
                                    </li>
                                </ul>

                                <EventTicketCta
                                    href={checkoutHref}
                                    isFree={isFree}
                                    isClosed={isClosed}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-slate-400">
                            {isFree ? 'Entry' : 'From'}
                        </p>
                        <p className="text-xl font-bold leading-tight text-slate-900">{priceLabel}</p>
                    </div>
                    <EventTicketCta href={checkoutHref} isFree={isFree} isClosed={isClosed} />
                </div>
            </div>
        </div>
    );
}

/* ---------- helpers & small components ---------- */

function getHostName(user: unknown): string {
    if (!user || typeof user !== 'object') return 'the organizer';
    const u = user as Record<string, unknown>;
    const full = [u.firstName, u.lastName].filter(Boolean).join(' ');
    return String(full || u.name || u.username || 'the organizer');
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
    const initials = name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');

    return (
        <span
            className={`flex shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 ${size === 'lg' ? 'size-14 text-lg' : 'size-10 text-sm'
                }`}
        >
            {initials || '?'}
        </span>
    );
}

function InfoCard({
    icon: Icon,
    label,
    children,
}: {
    icon: React.ElementType;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-4 rounded border border-slate-200 bg-white p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                    {label}
                </p>
                {children}
            </div>
        </div>
    );
}

