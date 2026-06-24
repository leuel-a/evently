'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {revalidateDashboardEventsPage} from '@/app/dashboard/events/actions';
import {RangeSelector} from '@/components/blocks/Common/RangeSelector';
import {APP_ROUTES} from '@/config/routes';
import {
    getValueFromFilterParam,
    removePropertyFromFilter,
    setValueToFilterParams,
} from '@/utils/filters';

interface TicketPriceRangeSelectorProps {
    min: number;
    max: number;
}

export const PRICE_FILTER_PARAM_KEY = 'price';

export function TicketPriceRangeSelector(props: TicketPriceRangeSelectorProps) {
    const {min, max} = props;
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleValueChange = async (value: number[]) => {
        let params = new URLSearchParams(searchParams.toString());

        if (value[0] === min && value[1] == max) {
            params = removePropertyFromFilter(params, PRICE_FILTER_PARAM_KEY);
        } else {
            params = setValueToFilterParams(
                params,
                PRICE_FILTER_PARAM_KEY,
                value.map((v) => v.toString()),
            );
        }

        await revalidateDashboardEventsPage();
        router.push(`${APP_ROUTES.dashboard.events.base}?${params.toString()}`);
    };

    const selectedPrice = getValueFromFilterParam(searchParams, PRICE_FILTER_PARAM_KEY).map(
        (value) => parseInt(value),
    );

    return (
        <RangeSelector
            label="Price"
            debounceTimer={400}
            value={selectedPrice.length > 0 ? selectedPrice : [min, max]}
            min={min}
            max={max}
            onValueChange={handleValueChange}
        />
    );
}
