import {Calendar, Tag, Ticket, Settings, ClipboardList} from 'lucide-react';
import type {ResourceItems} from '@/types/resources';

const resources: ResourceItems = [
    {
        name: 'events',
        icon: Calendar,
    },
    {
        name: 'eventTypes',
        icon: Tag,
    },
    {
        name: 'tickets',
        icon: Ticket,
    },
    {
        name: 'settings',
        icon: Settings,
    },
    {
        name: 'reservations',
        icon: ClipboardList,
    },
];

export {resources};
