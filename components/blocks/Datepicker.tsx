'use client';

import {useState, ComponentProps} from 'react';
import {format} from 'date-fns';
import {Calendar as CalendarIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';
import type {ButtonProps} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';

export function Datepicker(props: DatepickerProps) {
    const {defaultValue, CalendarProps: calendarProps = {}, ButtonProps = {}, PopoverProps = {}, PopoverContentProps = {}, onChange} = props;

    const {className: popoverContentClassname, ...popoverContentProps} = PopoverContentProps;
    const {className: buttonClassName, ...buttonProps} = ButtonProps;
    const [date, setDate] = useState<Date | undefined>(defaultValue);

    return (
        <Popover {...PopoverProps}>
            <PopoverTrigger asChild>
                <Button
                    {...buttonProps}
                    variant="outline"
                    data-empty={!date}
                    className={cn('data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal', buttonClassName)}
                >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-auto bg-white p-0', popoverContentClassname)}>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selected) => {
                        setDate(selected);

                        // call the onChange handler, this is only used on forms
                        if (onChange) onChange(date);
                    }}
                    {...calendarProps}
                />
            </PopoverContent>
        </Popover>
    );
}

export interface DatepickerProps {
    ButtonProps?: ButtonProps;
    CalendarProps?: Omit<ComponentProps<typeof Calendar>, 'mode'>;
    PopoverProps?: ComponentProps<typeof Popover>;
    PopoverContentProps?: ComponentProps<typeof PopoverContent>;
    defaultValue?: Date;
    onChange?: (...event: any[]) => void;
}
