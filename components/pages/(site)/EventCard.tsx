import {Laptop, MapPin, Calendar, Users, ArrowRight, Eye} from 'lucide-react';
import Link from 'next/link';
import {Events} from '@/app/generated/client';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {APP_ROUTES} from '@/config/routes';

interface EventProps {
    event: Events;
}

export function EventCard(props: EventProps) {
    const {event} = props;

    return (
        <div className="group relative bg-white dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 p-6 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 overflow-hidden hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 group-hover:from-indigo-50 group-hover:via-white group-hover:to-violet-50 dark:group-hover:from-indigo-900/20 dark:group-hover:via-zinc-900 dark:group-hover:to-violet-900/10 transition-all duration-500" />

            <div className="absolute inset-0 rounded border border-transparent bg-gradient-to-br from-indigo-500/0 via-violet-400/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:via-violet-400/5 group-hover:to-indigo-500/10 dark:group-hover:from-indigo-500/20 dark:group-hover:via-violet-400/10 dark:group-hover:to-indigo-500/20 transition-all duration-500" />

            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-violet-400/5 to-transparent rounded" />

            <div className="relative z-10 flex flex-col gap-6 h-full">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300">
                            {event.title}
                        </h3>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={`${APP_ROUTES.events.base}/${event.id}`}
                                    className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-zinc-800/50 hover:bg-indigo-500/20 border border-gray-300 dark:border-zinc-700 hover:border-indigo-500 rounded text-gray-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300 group/link"
                                >
                                    <Eye className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white">
                                <p>View event details</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <p className="text-gray-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {event.description}
                </p>

                <div className="flex flex-col gap-3 flex-grow">
                    <div className="flex items-center text-sm text-gray-600 dark:text-zinc-400">
                        {event.isVirtual ? (
                            <>
                                <div className="p-1.5 bg-indigo-500/10 rounded mr-3 group-hover:bg-indigo-500/20 transition-colors duration-300">
                                    <Laptop className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                                </div>
                                <span>Virtual Event</span>
                            </>
                        ) : (
                            <>
                                <div className="p-1.5 bg-indigo-500/10 rounded mr-3 group-hover:bg-indigo-500/20 transition-colors duration-300">
                                    <MapPin className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                                </div>
                                <span className="line-clamp-1">{event.address}</span>
                            </>
                        )}
                    </div>

                    {event.date && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-zinc-400">
                            <div className="p-1.5 bg-indigo-500/10 rounded mr-3 group-hover:bg-indigo-500/20 transition-colors duration-300">
                                <Calendar className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                            </div>
                            <span>
                                {new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                    )}

                    {event.capacity && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-zinc-400">
                            <div className="p-1.5 bg-indigo-500/10 rounded mr-3 group-hover:bg-indigo-500/20 transition-colors duration-300">
                                <Users className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                            </div>
                            <span>{event.capacity} attendees</span>
                        </div>
                    )}
                </div>

                <Button
                    asChild
                    className="relative bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 rounded transition-all duration-300 group/btn shadow-lg hover:shadow-indigo-500/25 overflow-hidden"
                >
                    <Link href={`${APP_ROUTES.events.base}/${event.id}`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform duration-700" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Reserve Your Spot
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </span>
                    </Link>
                </Button>
            </div>
            <div className="absolute inset-0 rounded bg-indigo-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>
    );
}
