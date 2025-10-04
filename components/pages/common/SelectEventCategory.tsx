'use client';

import {useState, useEffect, type ComponentProps} from 'react';
import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import {v4 as uuid} from 'uuid';
import {EventsCategory} from '@/app/generated';
import {Button} from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {cn} from '@/lib/utils';
import {
    getValueFromFilterParam,
    removePropertyFromFilter,
    removeValueFromFilterParams,
    setValueToFilterParams,
} from '@/utils/filters';

const CATEGORIES_FILTER_PARAM_KEY = 'categories';
const CATEGORIES_FILTER_PLACEHOLDER = 'All';
const DEFAULT_CATEGORIES_FILTER_PARAM_VALUE = 'All';

export interface SelectEventCategoryProps {
    SelectTriggerProps?: ComponentProps<typeof Button>;
    categories: EventsCategory[];
}

export function SelectEventCategory({
    categories,
    SelectTriggerProps = {},
}: SelectEventCategoryProps) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const categoryFilters = getValueFromFilterParam(params, CATEGORIES_FILTER_PARAM_KEY);
    const [selected, setSelected] = useState<string>(DEFAULT_CATEGORIES_FILTER_PARAM_VALUE);

    useEffect(() => {
        let newParams = new URLSearchParams(params.toString());
        if (selected === DEFAULT_CATEGORIES_FILTER_PARAM_VALUE) {
            newParams = removePropertyFromFilter(params, CATEGORIES_FILTER_PARAM_KEY);
        } else {
            if (categoryFilters.includes(selected)) {
                newParams = removeValueFromFilterParams(
                    newParams,
                    CATEGORIES_FILTER_PARAM_KEY,
                    selected,
                );
            } else {
                newParams = setValueToFilterParams(
                    newParams,
                    CATEGORIES_FILTER_PARAM_KEY,
                    selected,
                );
            }
        }
        router.replace(`${pathname}?${newParams.toString()}`);
    }, [selected]);

    const {
        size,
        variant,
        className: selectTriggerClassName,
        ...selectTriggerProps
    } = SelectTriggerProps;

    return (
        <Select
            value={selected}
            onValueChange={setSelected}
        >
            <SelectTrigger
                {...selectTriggerProps}
                className={cn('bg-white rounded data-[size=default]:h-12', selectTriggerClassName)}
            >
                <SelectValue placeholder={CATEGORIES_FILTER_PLACEHOLDER} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={DEFAULT_CATEGORIES_FILTER_PARAM_VALUE}>
                    {DEFAULT_CATEGORIES_FILTER_PARAM_VALUE}
                </SelectItem>
                {categories &&
                    categories.map((cateogry) => (
                        <SelectItem
                            key={uuid()}
                            value={cateogry.name}
                        >
                            {cateogry.name}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
}
