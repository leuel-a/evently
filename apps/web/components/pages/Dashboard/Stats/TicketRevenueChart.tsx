'use client';

import {useState} from 'react';
import type {ComponentProps} from 'react';
import {GetDashboardPageDataResult} from '@/app/dashboard/actions';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {SelectTicketRevenueYear} from './SelectTicketRevenueYear';
import {GraphType, SelectRevenueGraphType} from './SelectRevenueGraphType';
import {TicketRevenueLineChart} from './TicketRevenueLineChart';
import {TicketRevenueBarChart} from './TicketRevenueBarChart';

interface TicketRevenueChartProps {
    CardProps?: ComponentProps<typeof Card>;
    revenueData: GetDashboardPageDataResult['tickets']['revenues'];
}

export function TicketRevenueChart(props: TicketRevenueChartProps) {
    const {CardProps = {}, revenueData} = props;
    const {className: customCardClassName, ...cardProps} = CardProps;

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [graphType, setGraphType] = useState<GraphType>('line');
    const choices = Array.from(new Set(revenueData?.map(({year}) => year)));

    return (
        <Card
            className={cn(
                'rounded border border-border/60 shadow-none bg-card',
                customCardClassName,
            )}
            {...cardProps}
        >
            <CardHeader className="pb-3 pt-4 px-5 flex justify-between">
                <CardTitle className="font-semibold tracking-tighter uppercase text-muted-foreground/70 leading-none">
                    Revenue
                </CardTitle>
                <div className="flex gap-2">
                    <SelectRevenueGraphType onChange={setGraphType} />
                    <SelectTicketRevenueYear
                        setYear={setSelectedYear}
                        defaultValue={'2026'}
                        choices={choices}
                    />
                </div>
            </CardHeader>
            <CardContent>
                {graphType === 'line' && (
                    <TicketRevenueLineChart revenueData={revenueData} year={selectedYear} />
                )}
                {graphType === 'bar' && (
                    <TicketRevenueBarChart revenueData={revenueData} year={selectedYear} />
                )}
            </CardContent>
        </Card>
    );
}
