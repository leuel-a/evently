import {Calendar} from 'lucide-react';
import type {ResourceItems} from '@/types/resources';

const resources: ResourceItems = [
    {
        name: 'events',
        icon: Calendar,
        hasCreate: true,
    },
];

export {resources};
