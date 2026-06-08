'use client';

import {ComponentProps, Dispatch, SetStateAction} from 'react';
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from '@/components/ui/select';

interface SelectEventsByCategoryChartProps {
    setChart: Dispatch<SetStateAction<string>>;
    defaultValue: ComponentProps<typeof Select>['defaultValue'];
}

export function SelectEventsByCategoryChart(props: SelectEventsByCategoryChartProps) {
    const {defaultValue, setChart} = props;
    const handleSelectValueChange = (value: string) => {
        setChart(value);
    };

    return (
        <Select defaultValue={defaultValue} onValueChange={handleSelectValueChange}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="pie">Pie</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
            </SelectContent>
        </Select>
    );
}
