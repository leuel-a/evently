import Link from 'next/link';
import {notFound} from 'next/navigation';
import prisma from '@/lib/db/prisma';

interface PageProps {
    params: Promise<{id: string}>;
}

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString(undefined, {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'});
}

function formatTime(hms?: string) {
    if (!hms) return '';
    const [h, m] = hms.split(':');
    const date = new Date();
    date.setHours(Number(h), Number(m || '0'));
    return date.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'});
}

export default async function Page({params}: PageProps) {
    const {id} = await params;
    const event = await prisma.events.findUnique({
        where: {id},
        include: {category: true, user: true},
    });

    if (!event) return notFound();

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex items-start gap-6">
                <div className="w-40 h-40 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border">
                    {event.coverImageUrl ? (
                        // use simple img to avoid next/image config issues in this snippet
                        <img
                            src={event.coverImageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-800 capitalize">{event.title}</h1>
                            <p className="mt-1 text-sm text-slate-500">{event.category?.name ?? 'Uncategorized'}</p>
                        </div>

                        <div className="text-right space-y-2">
                            <Link
                                href={`/dashboard/events/${event.id}/edit`}
                                className="inline-flex items-center gap-2 px-3 py-1.5 border rounded text-sm bg-white hover:bg-slate-50"
                            >
                                Edit
                            </Link>
                            <div className="text-xs text-slate-500">Created {new Date(event.createdAt).toLocaleDateString()}</div>
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
                                    <div className="italic text-sky-600">Virtual event</div>
                                ) : (
                                    <>
                                        <div>{event.address ?? 'Address not provided'}</div>
                                        <div className="text-sm text-slate-500">
                                            {event.city ? `${event.city}${event.country ? `, ${event.country}` : ''}` : (event.country ?? '')}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="rounded border p-4 bg-white">
                            <h3 className="text-sm font-medium text-slate-600">Capacity</h3>
                            <div className="mt-2 text-sm text-slate-700">{event.capacity ?? 'Unlimited'}</div>
                        </div>

                        <div className="rounded border p-4 bg-white">
                            <h3 className="text-sm font-medium text-slate-600">Organizer</h3>
                            <div className="mt-2 text-sm text-slate-700">
                                <div className="font-medium">{event.user?.name ?? 'Unknown'}</div>
                                <div className="text-sm text-slate-500">{event.user?.email}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded border p-6 bg-white">
                        <h3 className="text-sm font-medium text-slate-600">Description</h3>
                        <p className="mt-3 text-sm text-slate-700 whitespace-pre-line">{event.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
