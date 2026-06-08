import {Fragment, useState} from 'react';
import {ChartLine, ChartBar} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

export type GraphType = 'line' | 'bar';

interface SelectRevenueGraphTypeProps {
    defaultType?: GraphType;
    onChange?: (type: GraphType) => void;
}

export function SelectRevenueGraphType({
    defaultType = 'line',
    onChange,
}: SelectRevenueGraphTypeProps) {
    const [selected, setSelected] = useState<GraphType>(defaultType);

    function handleSelect(type: GraphType) {
        setSelected(type);
        onChange?.(type);
    }

    return (
        <Fragment>
            <Button
                size="icon"
                className={cn(
                    'cursor-pointer',
                    selected === 'line' ? 'bg-chart-3 hover:bg-chart-3/70' : '',
                )}
                variant={selected === 'line' ? 'default' : 'ghost'}
                onClick={() => handleSelect('line')}
            >
                <ChartLine />
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
