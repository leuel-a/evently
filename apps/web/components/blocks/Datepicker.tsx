'use client';

import type {ComponentProps} from 'react';
import {format} from 'date-fns';
import {CalendarIcon} from 'lucide-react';
import {DayPicker, type PropsSingle} from 'react-day-picker';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';

export type DatepickerProps = ComponentProps<typeof DayPicker> &
    Omit<PropsSingle, 'mode'> & {
        buttonVariant?: ComponentProps<typeof Button>['variant'];
    };

export function Datepicker(props: DatepickerProps) {
    const {buttonVariant, selected, onSelect} = props;
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={buttonVariant || 'outline'}
                    data-empty={!selected}
                    className={cn(
                        'h-12 data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal',
                    )}
                >
                    <CalendarIcon />
                    {selected ? format(selected, 'PPP') : <span>Pick a selected</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar mode="single" selected={selected} onSelect={onSelect} />
            </PopoverContent>
        </Popover>
    );
}
