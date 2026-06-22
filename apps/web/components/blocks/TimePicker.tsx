import type {ComponentProps} from 'react';
import {Input} from '@/components/ui/input';

interface TimePickerProps {
    InputProps?: ComponentProps<typeof Input>;
}

export function TimePicker(props: TimePickerProps) {
    const {InputProps = {}} = props;
    return (
        <Input
            className={`border-input bg-background h-12 appearance-none border [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none`}
            step="1"
            type="time"
            {...InputProps}
        />
    );
}
