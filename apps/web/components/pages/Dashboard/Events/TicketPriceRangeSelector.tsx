'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {revalidateEvents} from '@/app/dashboard/events/actions';
import {RangeSelector} from '@/components/blocks/Common/RangeSelector';
import {APP_ROUTES} from '@/config/routes';
import {getValueFromFilterParam, setValueToFilterParams} from '@/utils/filters';

interface TicketPriceRangeSelectorProps {
    min: number;
    max: number;
}

export const PRICE_FILTER_PARAM_KEY = 'price';

export function TicketPriceRangeSelector(props: TicketPriceRangeSelectorProps) {
    const {min, max} = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    const priceFilter = getValueFromFilterParam(searchParams, PRICE_FILTER_PARAM_KEY);

    const handleValueChange = async (value: number[]) => {
        let params = new URLSearchParams(searchParams.toString());
        params = setValueToFilterParams(
            params,
            PRICE_FILTER_PARAM_KEY,
            value.map((v) => v.toString()),
        );

        await revalidateEvents();
        router.push(`${APP_ROUTES.dashboard.events.base}?${params.toString()}`);
    };

    return (
        <RangeSelector
            debounceTimer={400}
            value={
                priceFilter?.length > 0 ? priceFilter.map((value) => parseInt(value)) : [min, max]
            }
            min={min}
            max={max}
            onValueChange={handleValueChange}
        />
    );
}
