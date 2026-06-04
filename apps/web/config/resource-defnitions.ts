import {Calendar, Tag, ChartBarStacked} from 'lucide-react';
import type {ResourceItems} from '@/types/resources';
import {capitalizeFirstLetters} from '@/utils/strings';

export function normalizeResourceName(name: string) {
    const resource = name.replaceAll('-', ' ').split(' ');
    return `${resource[0]}${capitalizeFirstLetters(resource.slice(1), '')}`;
}

const resources: ResourceItems = [
    {
        name: 'events',
        icon: Calendar,
        hasCreate: true,
    },
    {
        name: 'tickets',
        icon: Tag,
        hasCreate: false,
    },
    {
        name: 'eventsCategory',
        icon: ChartBarStacked,
        hasCreate: true,
    },
];

export {resources};
