import {Calendar, Tag, Ticket, Settings, ClipboardList} from 'lucide-react';
import type {ResourceItems} from '@/types/resources';

const resources: ResourceItems = [
    {
        name: 'events',
        icon: Calendar,
        hasCreate: true,
    },
    {
        name: 'reservations',
        icon: ClipboardList,
    },
];

export {resources};
