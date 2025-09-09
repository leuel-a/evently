import Link from 'next/link';
import {notFound} from 'next/navigation';
import {EventsDescription} from '@/components/pages/dashboard/Events/EventsDescription';
import {APP_ROUTES} from '@/config/routes';
import prisma from '@/lib/db/prisma';
import {formatDate, formatTime} from '@/utils/date';

export interface PageProps {
    params: Promise<{id: string}>;
}

export default async function Page({params}: PageProps) {
    const {id} = await params;
    const event = await prisma.events.findUnique({
        where: {id},
        include: {category: true, user: true},
    });

    if (!event) return notFound();

    return (
        <div className="max-w-7xl p-6">
            <div className="flex items-start gap-6">
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-800 capitalize">
                                {event.title}
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                {event.category?.name ?? 'Uncategorized'}
                            </p>
                        </div>

                        <div className="text-right space-y-2">
                            <Link
                                href={`${APP_ROUTES.dashboard.events.base}/${event.id}/update`}
                                className="inline-flex items-center gap-2 px-3 py-1.5 border rounded text-sm bg-white hover:bg-slate-50"
                            >
                                Edit
                            </Link>
                            <div className="text-xs text-slate-500">
                                Created {new Date(event.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded border p-4 bg-white">
                            <h3 className="text-sm font-medium text-slate-600">When</h3>
                            <div className="mt-2 text-sm text-slate-700">
                                <div>{formatDate(event.date)}</div>
                                <div className="mt-1 text-sm text-slate-500">
                                    {formatTime(event.startTime)}
                                    {event.endTime ? ` — ${formatTime(event.endTime)}` : ''}
                                </div>
                            </div>
                        </div>

                        <div className="rounded border p-4 bg-white">
                            <h3 className="text-sm font-medium text-slate-600">Where</h3>
                            <div className="mt-2 text-sm text-slate-700">
                                {event.isVirtual ? (
                                    <div className="text-indigo-600">Virtual event</div>
                                ) : (
                                    <>
                                        <div>{event.address ?? 'Address not provided'}</div>
                                        <div className="text-sm text-slate-500">
                                            {event.city
                                                ? `${event.city}${event.country ? `, ${event.country}` : ''}`
                                                : (event.country ?? '')}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="rounded border p-4 bg-white">
                            <h3 className="text-sm font-medium text-slate-600">Capacity</h3>
                            <div className="mt-2 text-sm text-slate-700">
                                {event.capacity ?? 'Unlimited'}
                            </div>
                        </div>

                        <div className="rounded border p-4 bg-white">
                            <h3 className="text-sm font-medium text-slate-600">Organizer</h3>
                            <div className="mt-2 text-sm text-slate-700">
                                <div className="font-medium">{event.user?.name ?? 'Unknown'}</div>
                                <div className="text-sm text-slate-500">{event.user?.email}</div>
                            </div>
                        </div>
                    </div>
                    <EventsDescription event={event} />
                </div>
            </div>
        </div>
    );
}
