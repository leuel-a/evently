'use client';

import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {cn} from '@/lib/utils';
import {getEventsQuery} from '@/queries/eventCategory';
import {MultiSelectEventCategory} from '../common/MultiSelectEventCategory';
import {SearchEvents} from '../common/SearchEvents';
import {SelectEventType} from '../common/SelectEventType';
import {ShowFiltersButton} from '../common/ShowFiltersButton';

export const SELECT_CATEGORIES_PLACEHOLDER = 'Select different categories...';

export function FiltersEvent() {
    const [showFilter, setShowFilter] = useState<boolean>(true);

    const {data: eventCategories} = useQuery({
        queryKey: ['events:select-event-category'],
        queryFn: getEventsQuery,
    });
    return (
        <div className="flex flex-col gap-1 md:gap-0 md:flex justify-between">
            <div className="flex justify-between py-8 pt-4">
                <SearchEvents />
                <ShowFiltersButton
                    setShowFilter={setShowFilter}
                    showFilter={showFilter}
                />
            </div>
            <div
                className={cn(
                    'transition-all duration-1000 ease-in-out overflow-hidden',
                    showFilter ? 'max-h-96' : 'max-h-0',
                )}
            >
                <h3 className="text-lg text-zinc-900 dark:text-white font-medium border-b border-gray-200 pb-1 my-3">
                    Filters
                </h3>
                <div className="flex gap-2">
                    <div className="">
                        <MultiSelectEventCategory
                            MultiSelectProps={{placeholder: SELECT_CATEGORIES_PLACEHOLDER}}
                            categories={eventCategories ?? []}
                        />
                    </div>
                    <SelectEventType
                        SelectTriggerProps={{className: 'data-[size=default]:h-12 w-40'}}
                    />
                </div>
            </div>
        </div>
    );
}
