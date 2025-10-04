'use client';

import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useIsMobile} from '@/hooks/use-mobile';
import {cn} from '@/lib/utils';
import {getEventsQuery} from '@/queries/eventCategory';
import {MultiSelectEventCategory} from '../common/MultiSelectEventCategory';
import {SearchEvents} from '../common/SearchEvents';

export const SELECT_CATEGORIES_PLACEHOLDER = 'Select different categories...';

export function FiltersEvent() {
    const isMobile = useIsMobile();
    const [showFilter, setShowFilter] = useState<boolean>();

    const {data: eventCategories} = useQuery({
        queryKey: ['events:select-event-category'],
        queryFn: getEventsQuery,
    });
    return (
        <div className="flex flex-col gap-1 md:gap-0 md:flex-row justify-between">
            <SearchEvents />
            <div className="relative md:hidden py-8 pt-4">
                <Button
                    variant="secondary"
                    onClick={() => setShowFilter((prev) => !prev)}
                    className="absolute right-0 bg-white md:bg-transparent"
                >
                    {showFilter ? <ChevronUp /> : <ChevronDown />}
                </Button>
            </div>
            <div className={cn(isMobile && showFilter ? 'block' : 'hidden md:block')}>
                <div className="w-96">
                    <MultiSelectEventCategory
                        MultiSelectProps={{placeholder: SELECT_CATEGORIES_PLACEHOLDER}}
                        categories={eventCategories ?? []}
                    />
                </div>
            </div>
        </div>
    );
}
