'use client';

import {useState, useEffect} from 'react';
import type {ChangeEvent, ComponentProps} from 'react';
import {useDebounce} from '@/hooks/use-debounce';
import {Slider} from '@/components/ui/slider';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {cn} from '@/lib/utils';

const NUMBER_INPUT_WIDTH = 'w-20';

interface RangeSelectorProps {
    SliderProps?: Omit<ComponentProps<typeof Slider>, 'value' | 'onValueChange' | 'min' | 'max'>;
    value?: ComponentProps<typeof Slider>['value'];
    onValueChange?: ComponentProps<typeof Slider>['onValueChange'];
    debounceTimer?: number;
    min: number;
    max: number;
    label?: string;
}

export function RangeSelector(props: RangeSelectorProps) {
    const {
        label = '',
        value,
        onValueChange,
        min,
        max,
        debounceTimer = 300,
        SliderProps = {},
    } = props;
    const {className: customSliderClassName, ...sliderProps} = SliderProps;

    const [rangeValue, setRangeValue] = useState<number[]>(value as number[]);
    const debouncedRangeValue = useDebounce(rangeValue, debounceTimer);

    const handleRangeChange = (value: number[]) => {
        setRangeValue(value);
    };

    const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const parsed = parseFloat(e.target.value);
        if (isNaN(parsed)) return;

        const prevMin = rangeValue[0] ?? min;
        const prevMax = rangeValue[1] ?? max;

        let next: number[];
        if (type === 'min') {
            const clamped = Math.min(Math.max(parsed, min), prevMax);
            next = [clamped, prevMax];
        } else {
            const clamped = Math.max(Math.min(parsed, max), prevMin);
            next = [prevMin, clamped];
        }

        setRangeValue(next);
    };

    useEffect(() => {
        onValueChange?.(debouncedRangeValue);
    }, [debouncedRangeValue]);

    useEffect(() => {
        if (value && Array.isArray(value)) {
            if (value[0] !== rangeValue[0] || value[1] !== rangeValue[1]) {
                setRangeValue(value);
            }
        }
    }, [value]);

    return (
        <div className="flex gap-2 w-80 items-center">
            {label && <Label>{label}</Label>}
            <div className="flex gap-2 w-full">
                <Input
                    value={rangeValue?.[0]}
                    onChange={(e) => handleInputValueChange(e, 'min')}
                    className={cn(NUMBER_INPUT_WIDTH)}
                    type="number"
                />
                <Slider
                    className={cn(customSliderClassName)}
                    value={rangeValue}
                    onValueChange={handleRangeChange}
                    min={min}
                    max={max}
                    {...sliderProps}
                />
                <Input
                    value={rangeValue?.[1]}
                    onChange={(e) => handleInputValueChange(e, 'max')}
                    className={cn(NUMBER_INPUT_WIDTH)}
                    type="number"
                />
            </div>
        </div>
    );
}
