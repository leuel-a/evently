import {EventsCategory} from '@/app/generated';
import {MultiSelectEventCategory} from '@/components/pages/common';
import {SearchEvents} from '../../common/SearchEvents';

interface EventsFilterTableProps {
    categories: EventsCategory[];
}

export const SELECT_CATEGORIES_PLACEHOLDER = 'Select different categories...';

export async function FilterEventsTable({categories}: EventsFilterTableProps) {
    return (
        <div className="flex gap-2 mb-2">
            <div className="flex w-full justify-between gap-8">
                <SearchEvents />
                <div className="">
                    <div className="w-96">
                        <MultiSelectEventCategory
                            MultiSelectProps={{placeholder: SELECT_CATEGORIES_PLACEHOLDER}}
                            categories={categories}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
