'use client';

import { ClearFilters } from '@/components/blocks/Common/ClearFilters';
import {SearchEventsCategory} from '@/components/pages/Common/SearchEventsCategory';

export function FilterEventsCategoryTable() {
    return (
        <div className="mb-4">
            <div className="flex gap-2 mb-2">
                <div className="flex w-full justify-between gap-8">
                    <SearchEventsCategory />
                </div>
            </div>
            <ClearFilters />
        </div>
    ); }
