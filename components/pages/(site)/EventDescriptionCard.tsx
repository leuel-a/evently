import {format} from 'date-fns';
import {MapPin, Calendar, Laptop, Clock, Users, Tag, DollarSign, Globe} from 'lucide-react';
import {GetEventByIdReturn} from '@/app/(site)/actions';
import {Events} from '@/app/generated/client';
import {Separator} from '@/components/ui/separator';

interface EventDescriptionCardProps {
    event: NonNullable<GetEventByIdReturn['data']>;
}

export function EventDescriptionCard({event}: EventDescriptionCardProps) {
    return (
        <div className="flex flex-col gap-8 flex-3 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-lg p-8">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-indigo-400" />
                    <span className="text-zinc-400 text-sm font-medium uppercase tracking-wide">
                        {event.category.name}
                    </span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                    {event.title}
                </h1>
            </div>

            <div className="space-y-8">
                <div>
                    <h2 className="text-lg font-semibold text-zinc-400 mb-4">About This Event</h2>
                    <Separator className="bg-zinc-800 mb-6" />
                    <p className="text-zinc-300 leading-relaxed text-lg">{event.description}</p>
                </div>

                <Separator className="bg-zinc-800" />

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Location & Date */}
                    <div className="space-y-4">
                        <div className="flex gap-3 items-center text-zinc-300">
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                                {event.isVirtual ? (
                                    <Laptop className="w-5 h-5 text-indigo-400" />
                                ) : (
                                    <MapPin className="w-5 h-5 text-indigo-400" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-medium">
                                    {event.isVirtual ? 'Virtual Event' : event.address}
                                </span>
                                {!event.isVirtual && event.city && event.country && (
                                    <span className="text-zinc-400 text-sm">
                                        {event.city}, {event.country}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 items-center text-zinc-300">
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                                <Calendar className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-medium">
                                    {getEventDate(event.date)}
                                </span>
                                <span className="text-zinc-400 text-sm">
                                    {getEventTime(event.startTime, event.endTime ?? undefined)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Capacity */}
                    <div className="space-y-4">
                        <div className="flex gap-3 items-center text-zinc-300">
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                                <DollarSign className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-medium">
                                    {event.isFree ? 'Free' : `$${event.price / 100}`}
                                </span>
                                <span className="text-zinc-400 text-sm">
                                    {event.isFree ? 'No cost to attend' : 'Per ticket'}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center text-zinc-300">
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                                <Users className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-medium">
                                    {event.capacity ? `${event.capacity} spots` : 'Unlimited'}
                                </span>
                                <span className="text-zinc-400 text-sm">
                                    {event.capacity ? 'Total capacity' : 'Open attendance'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Duration */}
                    {event.endTime && (
                        <div className="flex gap-3 items-center text-zinc-300">
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                                <Clock className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-medium">
                                    {calculateDuration(event.startTime, event.endTime)}
                                </span>
                                <span className="text-zinc-400 text-sm">Event duration</span>
                            </div>
                        </div>
                    )}

                    {/* Event Type */}
                    <div className="flex gap-3 items-center text-zinc-300">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <Globe className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-medium">
                                {event.isVirtual ? 'Online' : 'In-person'}
                            </span>
                            <span className="text-zinc-400 text-sm">Event format</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getEventDate(date: Date) {
    return format(new Date(date), 'EEEE, MMMM dd, yyyy');
}

function getEventTime(startTime: string, endTime?: string) {
    if (endTime) {
        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    }
    return `Starts at ${formatTime(startTime)}`;
}

function formatTime(timeString: string) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
}

function calculateDuration(startTime: string, endTime: string) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinute;
    const durationMinutes = endTotal - startTotal;

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else {
        return `${minutes}m`;
    }
}
