'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {MultiSelectEventCategory} from '@/components/pages/Common/MultiSelectEventCategory';
import {SearchEvents} from '../../Common/SearchEvents';
import {IEventsCategory} from '@/types/eventsCategory';
import {ClearFilters} from '@/components/blocks/Common/ClearFilters';
import {EventTypeSelector} from '../../Dashboard/Events';
import {removePropertyFromFilter, setValueToFilterParams} from '@/utils/filters';
import {APP_ROUTES} from '@/config/routes';
import {revalidateEventsPage} from '@/app/events/actions';

interface EventsFilterTableProps {
    categories: Array<Pick<IEventsCategory, 'id' | 'name'>>;
}

export const SELECT_CATEGORIES_PLACEHOLDER = 'Select different categories...';
export const EVENT_TYPE_FILTER_PARAM_KEY = 'type';

export function FilterEvents({categories}: EventsFilterTableProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleEventTypeChange = async (value: string) => {
        let params = new URLSearchParams(searchParams.toString());
        params = removePropertyFromFilter(params, EVENT_TYPE_FILTER_PARAM_KEY);
        params = setValueToFilterParams(params, EVENT_TYPE_FILTER_PARAM_KEY, value);
        await revalidateEventsPage();
        router.push(`${APP_ROUTES.events.base}?${params.toString()}`);
    };

    return (
        <div className="mb-4">
            <div className="flex gap-2 mb-4">
                <div className="flex flex-col w-full justify-between gap-8">
                    <SearchEvents />
                    <div className="flex gap-6 items-center justify-end">
                        <EventTypeSelector
                            SelectTriggerProps={{className: 'bg-white min-h-10 h-40'}}
                            onValueChange={handleEventTypeChange}
                        />
                        <div className="w-96">
                            <MultiSelectEventCategory
                                MultiSelectProps={{placeholder: SELECT_CATEGORIES_PLACEHOLDER}}
                                categories={categories}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ClearFilters />
        </div>
    );
}
