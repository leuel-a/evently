import {useSearchParams, useRouter} from 'next/navigation';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import {getValueFromFilterParam, removePropertyFromFilter, setValueToFilterParams} from '@/utils/filters';
import { EVENT_TYPE } from '@/types/events';
import { revalidateEvents } from '@/app/dashboard/events/actions';
import { APP_ROUTES } from '@/config/routes';

const EVENT_MODE_FILTER_LABEL = 'Type';
const EVENT_MODE_FILTER_PARAM_KEY = 'type';

export function EventTypeSelector() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const mode = getValueFromFilterParam(searchParams, EVENT_MODE_FILTER_PARAM_KEY);
    const selectedMode = mode[0] ?? '';

    const handleValueChange = async (value: string) => {
        let params = new URLSearchParams(searchParams.toString());
        params = removePropertyFromFilter(params, EVENT_MODE_FILTER_PARAM_KEY);
        params = setValueToFilterParams(params, EVENT_MODE_FILTER_PARAM_KEY, value);
        await revalidateEvents();
        router.push(`${APP_ROUTES.dashboard.events.base}?${params.toString()}`);
    };

    return (
        <div className="w-40 flex items-center gap-3">
            <Label>{EVENT_MODE_FILTER_LABEL}</Label>
            <div className="flex-1">
                <Select value={selectedMode} onValueChange={handleValueChange}>
                    <SelectTrigger type="button" className="w-full capitalize cursor-pointer">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(EVENT_TYPE).map((value) => (
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
