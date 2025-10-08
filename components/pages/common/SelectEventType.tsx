import {useState, type ComponentProps} from 'react';
import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {cn} from '@/lib/utils';
import {setValueToFilterParams} from '@/utils/filters';

const EVENT_TYPE_FILTERS_PARAM_KEY = '';

export interface SelectEventTypeProps {
    SelectTriggerProps?: ComponentProps<typeof SelectTrigger>;
}

export function SelectEventType({SelectTriggerProps = {}}: SelectEventTypeProps) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const {className: selectTriggerClassName, ...selectTriggerProps} = SelectTriggerProps;
    const [eventType, setEventType] = useState('');

    const handleSelectValueChange = (value: string) => {
        let newParams = new URLSearchParams(params.toString());
        newParams = setValueToFilterParams(newParams, EVENT_TYPE_FILTERS_PARAM_KEY, value);
        setEventType(value);

        router.replace(`${pathname}?${newParams.toString()}`);
    };

    return (
        <Select
            value={eventType}
            onValueChange={handleSelectValueChange}
        >
            <SelectTrigger
                {...selectTriggerProps}
                className={cn(
                    'w-auto rounded bg-white focus-visible:ring-0',
                    selectTriggerClassName,
                )}
            >
                <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
        </Select>
    );
}
