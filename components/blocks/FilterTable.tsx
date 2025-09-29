import {SearchResourceInput} from '@/components/pages/dashboard/Common';
import {FilterProvider} from '@/context/FiltersContext';
import {cn} from '@/lib/utils';

export interface FilterTableProps {
    className?: string;
}

export function FilterTable({className}: FilterTableProps) {
    return (
        <FilterProvider>
            <div className={cn('py-4', className)}>
                <SearchResourceInput />
            </div>
        </FilterProvider>
    );
}
