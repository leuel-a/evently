'use client';

import {Fragment, useState} from 'react';
import {ChartPie, ChartBar} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

export type GraphType = 'pie' | 'bar';

interface SelectEventsByCategoryChartProps {
    onChange?: (type: GraphType) => void;
    defaultValue: GraphType;
}

export function SelectEventsByCategoryChart(props: SelectEventsByCategoryChartProps) {
    const {defaultValue, onChange} = props;
    const [selected, setSelected] = useState<GraphType>(defaultValue);

    const handleSelect = (value: GraphType) => {
        setSelected(value);
        onChange?.(value);
    };

    return (
        <Fragment>
            <Button
                size="icon"
                className={cn(
                    'cursor-pointer',
                    selected === 'pie' ? 'bg-chart-3 hover:bg-chart-3/70' : '',
                )}
                variant={selected === 'pie' ? 'default' : 'ghost'}
                onClick={() => handleSelect('pie')}
            >
                <ChartPie />
            </Button>
            <Button
                size="icon"
                className={cn(
                    'cursor-pointer',
                    selected === 'bar' ? 'bg-chart-3 hover:bg-chart-3/70' : '',
                )}
                variant={selected === 'bar' ? 'default' : 'ghost'}
                onClick={() => handleSelect('bar')}
            >
                <ChartBar />
            </Button>
        </Fragment>
    );
}
