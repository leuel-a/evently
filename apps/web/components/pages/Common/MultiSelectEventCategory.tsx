'use client';

import {type ComponentProps, useRef, useEffect} from 'react';
import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import {MultiSelectRef} from '@/components/blocks/MultiSelect';
import {revalidateEvents} from '@/app/dashboard/events/actions';
import {MultiSelect} from '@/components/blocks/MultiSelect';
import {cn} from '@/lib/utils';
import {
    getValueFromFilterParam,
    removePropertyFromFilter,
    setValueToFilterParams,
} from '@/utils/filters';
import {IEventsCategory} from '@/types/eventsCategory';

export const CATEGORIES_FILTER_PARAM_KEY = 'categories';
export const CATEGORIES_FILTER_PLACEHOLDER = 'All';
export const DEFAULT_CATEGORIES_FILTER_PARAM_VALUE = 'All';

interface MultiSelectEventCategoryProps {
    MultiSelectProps?: Omit<ComponentProps<typeof MultiSelect>, 'onValueChange' | 'options'>;
    categories: Array<Pick<IEventsCategory, 'id' | 'name'>>;
}

export function MultiSelectEventCategory({
    categories,
    MultiSelectProps = {},
}: MultiSelectEventCategoryProps) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const multiSelectRef = useRef<MultiSelectRef>(null);

    const {className: multiSelectContainerClassName, ...restMultiSelectProps} = MultiSelectProps;
    const selectedCategories = getValueFromFilterParam(params, CATEGORIES_FILTER_PARAM_KEY);
    const options = categories.map((category) => ({value: category.name, label: category.name}));

    const handleValueChange = async (value: string[]) => {
        let newParams = new URLSearchParams(params.toString());

        if (value.length == 0) {
            newParams = removePropertyFromFilter(params, CATEGORIES_FILTER_PARAM_KEY);
        } else {
            newParams = setValueToFilterParams(newParams, CATEGORIES_FILTER_PARAM_KEY, value);
        }

        await revalidateEvents();
        router.replace(`${pathname}?${newParams.toString()}`);
    };

    return (
        <MultiSelect
            ref={multiSelectRef}
            className={cn(
                'h-12 rounded transition-all duration-300 backdrop-blur-sm border placeholder:text-gray-500 dark:placeholder:text-zinc-500 hover:border-gray-400 dark:hover:border-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
                'bg-white dark:bg-zinc-800/50 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800',
                multiSelectContainerClassName,
            )}
            options={options}
            value={selectedCategories}
            onValueChange={handleValueChange}
            {...restMultiSelectProps}
        />
    );
}
