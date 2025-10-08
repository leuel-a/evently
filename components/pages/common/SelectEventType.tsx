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
                    'bg-white dark:bg-zinc-800/50 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-zinc-500 hover:border-gray-400 dark:hover:border-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded transition-all duration-300',
                    selectTriggerClassName,
                )}
            >
                <SelectValue placeholder="Event type" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white rounded">
                <SelectItem
                    value="free"
                    className="focus:bg-gray-100 dark:focus:bg-zinc-700 focus:text-gray-900 dark:focus:text-white"
                >
                    Free
                </SelectItem>
                <SelectItem
                    value="paid"
                    className="focus:bg-gray-100 dark:focus:bg-zinc-700 focus:text-gray-900 dark:focus:text-white"
                >
                    Paid
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
