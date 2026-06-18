'use client';

import {MultiSelectEventCategory} from '@/components/pages/Common/MultiSelectEventCategory';
import {useDashboardSettings} from '@/context/DashboardSettingsContext';
import {SearchEvents} from '../../Common/SearchEvents';
import {IEventsCategory} from '@/types/eventsCategory';
import {TicketPriceRangeSelector} from './TicketPriceRangeSelector';
import {ClearFilters} from '@/components/blocks/Common/ClearFilters';
import {EventStatusSelector} from './EventStatusSelector';
import { EventModeSelector } from './EventModeSelector';

interface EventsFilterTableProps {
    categories: Array<Pick<IEventsCategory, 'id' | 'name'>>;
}

export const SELECT_CATEGORIES_PLACEHOLDER = 'Select different categories...';

export function FilterEventsTable({categories}: EventsFilterTableProps) {
    const {tickets} = useDashboardSettings();
    return (
        <div className="mb-4">
            <div className="flex gap-2 mb-4">
                <div className="flex flex-col w-full justify-between gap-8">
                    <SearchEvents />
                    <div className="flex gap-6 items-center justify-end">
                        <EventStatusSelector />
                        <EventModeSelector/>
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
