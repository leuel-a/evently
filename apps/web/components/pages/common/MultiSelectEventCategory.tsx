'use client';

import {useState, useEffect, type ComponentProps} from 'react';
import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import {MultiSelect} from '@/components/blocks/MultiSelect';
import {cn} from '@/lib/utils';
import {removePropertyFromFilter, setValueToFilterParams} from '@/utils/filters';

export const CATEGORIES_FILTER_PARAM_KEY = 'categories';
export const CATEGORIES_FILTER_PLACEHOLDER = 'All';
export const DEFAULT_CATEGORIES_FILTER_PARAM_VALUE = 'All';

interface EventsCategory {
    name: string;
}

interface MultiSelectEventCategoryProps {
    MultiSelectProps?: Omit<ComponentProps<typeof MultiSelect>, 'onValueChange' | 'options'>;
    categories: EventsCategory[];
}

export function MultiSelectEventCategory({
    categories,
    MultiSelectProps = {},
}: MultiSelectEventCategoryProps) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const {className: multiSelectContainerClassName, ...restMultiSelectProps} = MultiSelectProps;
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const options = categories.map((category) => ({value: category.name, label: category.name}));

    useEffect(() => {
        let newParams = new URLSearchParams(params.toString());

        if (selectedCategories.length == 0) {
            newParams = removePropertyFromFilter(params, CATEGORIES_FILTER_PARAM_KEY);
        } else {
            newParams = setValueToFilterParams(
                newParams,
                CATEGORIES_FILTER_PARAM_KEY,
                selectedCategories,
            );
        }

        router.replace(`${pathname}?${newParams.toString()}`);
    }, [selectedCategories]);

    return (
        <MultiSelect
            {...restMultiSelectProps}
            className={cn(
                'h-12 rounded transition-all duration-300 backdrop-blur-sm border placeholder:text-gray-500 dark:placeholder:text-zinc-500 hover:border-gray-400 dark:hover:border-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
                'bg-white dark:bg-zinc-800/50 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800',
                multiSelectContainerClassName,
            )}
            options={options}
            value={selectedCategories}
            onValueChange={setSelectedCategories}
        />
    );
}
