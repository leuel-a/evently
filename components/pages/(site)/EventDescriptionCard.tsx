'use client';

import {format} from 'date-fns';
import {MapPin, Calendar} from 'lucide-react';
import {motion} from 'motion/react';
import {Events} from '@/app/generated/client';
import {Separator} from '@/components/ui/separator';

interface EventDescriptionCardProps {
    event: Events;
}

export function EventDescriptionCard({event}: EventDescriptionCardProps) {
    return (
        <motion.div
            className="flex flex-col gap-8 flex-3 bg-white rounded shadow p-6"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
        >
            <h1 className="text-3xl font-medium tracking-tighter">{event.title}</h1>

            <div className="space-y-6">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2}}
                >
                    <h2 className="text-sm font-medium text-gray-500">Description</h2>
                    <Separator className="my-2 mb-4" />
                    <p className="text-justify text-gray-700 leading-relaxed">
                        {event.description}
                    </p>
                </motion.div>

                <Separator />

                <motion.div
                    className="space-y-3"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.3}}
                >
                    <div className="flex gap-2 items-center text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{getEventAddress(event)}</span>
                    </div>
                    <div className="flex gap-2 items-center text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{getEventDate(event.date)}</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function getEventDate(date: Date) {
    return format(new Date(date), 'MMMM dd, yyyy');
}

function getEventAddress(event: Events) {
    return event.isVirtual ? 'Remote' : event.address;
}
