'use client';

import {useSearchParams, useRouter} from 'next/navigation';
import {MultiSelectEventCategory} from '@/components/pages/Common/MultiSelectEventCategory';
import {useDashboardSettings} from '@/context/DashboardSettingsContext';
import {SearchEvents} from '../../Common/SearchEvents';
import {IEventCategoryApiResponse} from '@/types/eventsCategory';
import {TicketPriceRangeSelector} from './TicketPriceRangeSelector';
import {ClearFilters} from '@/components/blocks/Common/ClearFilters';
import {EventStatusSelector} from './EventStatusSelector';
import {EventTypeSelector} from './EventTypeSelector';
import { removePropertyFromFilter, setValueToFilterParams } from '@/utils/filters';
import { revalidateDashboardEventsPage } from '@/app/dashboard/events/actions';
import { APP_ROUTES } from '@/config/routes';

interface EventsFilterTableProps {
    categories: Array<Pick<IEventCategoryApiResponse, 'id' | 'name'>>;
}

// TODO: this should be in some other config file? or should it?
const EVENT_TYPE_FILTER_PARAM_KEY = 'type';
export const SELECT_CATEGORIES_PLACEHOLDER = 'Select different categories...';

export function FilterEventsTable({categories}: EventsFilterTableProps) {
    const {tickets} = useDashboardSettings();

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleEventTypeChange = async (value: string) => {
        let params = new URLSearchParams(searchParams.toString());
        params = removePropertyFromFilter(params, EVENT_TYPE_FILTER_PARAM_KEY);
        params = setValueToFilterParams(params, EVENT_TYPE_FILTER_PARAM_KEY, value);
        await revalidateDashboardEventsPage();
        router.push(`${APP_ROUTES.dashboard.events.base}?${params.toString()}`);
    };

    return (
        <div className="mb-4">
            <div className="flex gap-2 mb-4">
                <div className="flex flex-col w-full justify-between gap-8">
                    <SearchEvents />
                    <div className="flex gap-6 items-center justify-end">
                        <EventStatusSelector />
                        <EventTypeSelector onValueChange={handleEventTypeChange} />
                        {tickets && (
                            <TicketPriceRangeSelector
                                min={tickets?.priceRange.min}
                                max={tickets?.priceRange.max}
                            />
                        )}
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
