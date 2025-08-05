'use client';

import type {ComponentProps} from 'react';
import {DayPicker} from 'react-day-picker';
import type {PropsSingle} from 'react-day-picker';
import {format} from 'date-fns';
import {Calendar as CalendarIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';

export function Datepicker(props: DatepickerProps) {
    const {buttonVariant, selected, onSelect} = props;
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={buttonVariant || 'outline'}
                    data-empty={!selected}
                    className={cn('data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal')}
                >
                    <CalendarIcon />
                    {selected ? format(selected, 'PPP') : <span>Pick a selected</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-auto bg-white p-0')}>
                <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={onSelect}
                />
            </PopoverContent>
        </Popover>
    );
}

export type DatepickerProps = ComponentProps<typeof DayPicker> &
    Omit<PropsSingle, 'mode'> & {
        buttonVariant?: React.ComponentProps<typeof Button>['variant'];
    };
