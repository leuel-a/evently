'use client';

import {useState, useEffect, type ComponentProps} from 'react';
import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import {EventsCategory} from '@/app/generated';
import {MultiSelect} from '@/components/blocks/MultiSelect';
import {cn} from '@/lib/utils';
import {removePropertyFromFilter, setValueToFilterParams} from '@/utils/filters';

export const CATEGORIES_FILTER_PARAM_KEY = 'categories';
export const CATEGORIES_FILTER_PLACEHOLDER = 'All';
export const DEFAULT_CATEGORIES_FILTER_PARAM_VALUE = 'All';

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
            className={cn('bg-white h-12 rounded hover:bg-white', multiSelectContainerClassName)}
            options={options}
            value={selectedCategories}
            onValueChange={setSelectedCategories}
        />
    );
}
