import {EventsCategory} from '@/app/generated';
import {SelectEventCategory} from '@/components/pages/common';
import {SearchEvents} from '../../common/SearchEvents';
import {SearchEventsTable} from './SearchEventsTable';

interface EventsFilterTableProps {
    categories: EventsCategory[];
}

export async function FilterEventsTable({categories}: EventsFilterTableProps) {
    return (
        <div className="flex gap-2 my-4">
            <div className="flex flex-col gap-8">
                <SearchEvents />
                <SelectEventCategory
                    SelectTriggerProps={{className: 'w-80'}}
                    categories={categories}
                />
            </div>
        </div>
    );
}
