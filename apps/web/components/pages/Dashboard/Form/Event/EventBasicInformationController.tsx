import { EventTitleController } from './EventTitleController';
export function() {
    return (
        <div className="flex flex-col gap-4 border border-input group hover:border-indigo-100 px-8 py-4 rounded">
            <div>
                <span className="text-2xl font-medium">Basic Information</span>
                <p className="text-gray-500">Essential details about your event</p>
            </div>
            <Separator className="group-hover:bg-indigo-100" />
            <div className="space-y-4">
                <EventTitleController formControl={form.control} />
                <EventDescriptionController formControl={form.control} />
                <EventCategoryController formControl={form.control} />
            </div>
        </div>
    )
}
