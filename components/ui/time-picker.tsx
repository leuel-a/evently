import {useState} from 'react';
import type {ComponentProps} from 'react';
import {Input} from '@/components/ui/input';

export function TimePicker(props: TimePickerProps) {
    // FIXME: this is not a great solution, but it works for now
    const [interactedWith, setInteractedWith] = useState(false);

    return (
        <Input
            className={`border-input bg-background h-12 appearance-none border [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none ${
                !interactedWith ? 'text-muted-foreground' : ''
            }`}
            step="1"
            type="time"
            onFocus={() => setInteractedWith(true)}
            {...props}
        />
    );
}

export type TimePickerProps = ComponentProps<typeof Input>;
