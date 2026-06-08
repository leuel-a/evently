'use client';

import {type ComponentProps, SetStateAction, Dispatch} from 'react';
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from '@/components/ui/select';

interface SelectTicketRevenueYearProps {
    choices: number[];
    setYear: Dispatch<SetStateAction<number>>;
    defaultValue: ComponentProps<typeof Select>['defaultValue'];
}

export function SelectTicketRevenueYear(props: SelectTicketRevenueYearProps) {
    const {choices, defaultValue, setYear} = props;
    const handleSelectValueChange = (value: string) => {
        setYear(parseInt(value));
    };

    return (
        <Select defaultValue={defaultValue} onValueChange={handleSelectValueChange}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {choices.map((choice) => (
                    <SelectItem key={choice} value={choice.toString()}>
                        {choice}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
