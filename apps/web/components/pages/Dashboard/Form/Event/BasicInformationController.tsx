import type { Control } from 'react-hook-form';
import { EventTitleController } from './EventTitleController';
import { Separator } from '@/components/ui/separator';
import type { EventSchemaType } from '@/lib/db/schema';
import { EventCategoryController } from './EventCategoryController';
import { EventDescriptionController } from './EventDescriptionController';

interface EventBasicInformationControllerProps {
    formControl: Control<EventSchemaType>;
}

export function EventBasicInformationController(props: EventBasicInformationControllerProps) {
    const { formControl } = props;
    return (
        <div className="flex flex-col gap-4 border border-input group hover:border-indigo-100 px-8 py-4 rounded">
            <div>
                <span className="text-2xl font-medium">Basic Information</span>
                <p className="text-gray-500">Essential details about your event</p>
            </div>
            <Separator className="group-hover:bg-indigo-100" />
            <div className="space-y-4">
                <EventTitleController formControl={formControl} />
                <EventDescriptionController formControl={formControl} />
                <EventCategoryController formControl={formControl} />
            </div>
        </div>
    )
}
