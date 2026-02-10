import {memo} from 'react';
import {v4 as uuid} from 'uuid';
import {Field, FieldDescription, FieldLabel} from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from '@/components/ui/select';
import {useChoicesContext} from '@/context/ChoicesContext';

interface EventCategory {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export function EventCategoryInputComponent(props: EventCategoryInputProps) {
    const {onChange, value} = props;
    const {choices} = useChoicesContext<EventCategory>();

    return (
        <>
            <Field>
                <div className="space-y-1">
                    <FieldLabel htmlFor="eventCategory">Event Category</FieldLabel>
                    <FieldDescription>
                        Select the category that best fits your event. If you can't find the right
                        category, you can create a new one in the Event Category section of the
                        dashboard.
                    </FieldDescription>
                </div>

                <Select onValueChange={onChange} defaultValue={value}>
                    <SelectTrigger className="w-full rounded shadow-none focus-visible:ring-0 data-[size=default]:h-12">
                        <SelectValue placeholder="Select your event category" />
                    </SelectTrigger>
                    <SelectContent>
                        {choices?.map((choice) => (
                            <SelectItem key={uuid()} value={choice.id}>
                                {choice.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>
        </>
    );
}

export const EventCategoryInput = memo(
    EventCategoryInputComponent,
    (prevProps, nextProps) =>
        prevProps.value === nextProps.value && prevProps.onChange === nextProps.onChange,
);

export interface EventCategoryInputProps {
    onChange: (value: string) => void;
    value: string;
}
