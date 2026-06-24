'use client';

import {type ComponentProps} from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import {cn} from '@/lib/utils';
import {EVENT_STATUS} from '@/types/events';
import {
    getValueFromFilterParam,
    removePropertyFromFilter,
    setValueToFilterParams,
} from '@/utils/filters';
import {APP_ROUTES} from '@/config/routes';
import {revalidateDashboardEventsPage} from '@/app/dashboard/events/actions';

const EVENT_STATUS_FILTER_PARAM_KEY = 'status';
const EVENT_STATUS_FILTER_LABEL = 'Status';

interface EventStatusSelectorProps {
    SelectTriggerProps?: ComponentProps<typeof SelectTrigger>;
}

export function EventStatusSelector(props: EventStatusSelectorProps) {
    const {SelectTriggerProps = {}} = props;
    const {className: customSelectTriggerClass, ...selectTriggerProps} = SelectTriggerProps;

    const router = useRouter();
    const searchParams = useSearchParams();

    const status = getValueFromFilterParam(searchParams, EVENT_STATUS_FILTER_PARAM_KEY);
    const selectedStatus = status[0] ?? '';

    const handleValueChange = async (value: string) => {
        let params = new URLSearchParams(searchParams.toString());
        params = removePropertyFromFilter(params, EVENT_STATUS_FILTER_PARAM_KEY);
        params = setValueToFilterParams(params, EVENT_STATUS_FILTER_PARAM_KEY, value);
        await revalidateDashboardEventsPage();
        router.push(`${APP_ROUTES.dashboard.events.base}?${params.toString()}`);
    };

    return (
        <div className="w-40 flex items-center gap-3">
            <Label>{EVENT_STATUS_FILTER_LABEL}</Label>
            <div className="flex-1">
                <Select value={selectedStatus} onValueChange={handleValueChange}>
                    <SelectTrigger
                        type="button"
                        className={cn('w-full capitalize cursor-pointer', customSelectTriggerClass)}
                        {...selectTriggerProps}
                    >
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(EVENT_STATUS).map((value) => (
                            <SelectItem key={value} className="capitalize" value={value}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
