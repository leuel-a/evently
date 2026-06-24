import {type ComponentProps} from 'react';
import {useSearchParams} from 'next/navigation';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {
    getValueFromFilterParam,
} from '@/utils/filters';
import {cn} from '@/lib/utils';
import {EVENT_TYPE} from '@/types/events';

const EVENT_MODE_FILTER_PARAM_KEY = 'type';

interface EventTypeSelectorProps {
    SelectTriggerProps?: ComponentProps<typeof SelectTrigger>;
    onValueChange?: ComponentProps<typeof Select>['onValueChange'];
}

const EVENT_TYPE_PLACEHOLDER = 'Status';

export function EventTypeSelector(props: EventTypeSelectorProps) {
    const {SelectTriggerProps = {}, onValueChange} = props;
    const {className: customSelectTriggerClass, ...selectTriggerProps} = SelectTriggerProps;

    const searchParams = useSearchParams();
    const mode = getValueFromFilterParam(searchParams, EVENT_MODE_FILTER_PARAM_KEY);
    const selectedMode = mode[0] ?? '';

    const handleValueChange = async (value: string) => {
        onValueChange?.(value);
    };

    return (
        <div className="w-40 flex items-center h-full gap-3">
            <Select value={selectedMode} onValueChange={handleValueChange}>
                <SelectTrigger
                    type="button"
                    className={cn(
                        'w-full h-full capitalize cursor-pointer data-[size=default]:h-full border',
                        customSelectTriggerClass,
                    )}
                    {...selectTriggerProps}
                    // TODO: use a button as the select trigger for customizability
                >
                    <SelectValue placeholder={EVENT_TYPE_PLACEHOLDER} />
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
    );
}
