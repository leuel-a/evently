'use client';

import {useState, type ComponentProps} from 'react';
import {Line, LineChart, CartesianGrid, XAxis, YAxis} from 'recharts';
import {RechartsDevtools} from '@recharts/devtools';
import {GetDashboardPageDataResult} from '@/app/dashboard/actions';
import {
    ChartContainer,
    ChartConfig,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {SelectTicketRevenueYear} from './SelectTicketRevenueYear';
import { normalizeRevenueData } from './utils';

interface TicketRevenueLineChartProps {
    CardProps?: ComponentProps<typeof Card>;
    revenueData: GetDashboardPageDataResult['ticketsRevenueByMonth'];
}

const chartConfig = {
    revenue: {
        label: 'Revenue',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function TicketRevenueLineChart(props: TicketRevenueLineChartProps) {
    const {CardProps = {}, revenueData} = props;

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const {className: customCardClassName, ...cardProps} = CardProps;

    const normalizedData = normalizeRevenueData(revenueData);
    const chartData = normalizedData.filter((data) => data?.year == selectedYear);
    const chartHeight = (chartData?.length ?? 0) * 48 + 16;
    const choices = Array.from(new Set(revenueData.map(({year}) => year)));

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
                <SelectTicketRevenueYear
                    setYear={setSelectedYear}
                    defaultValue={'2026'}
                    choices={choices}
                />
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        className={cn(`min-h-[${chartHeight}]`)}
                    >
                        <CartesianGrid vertical={true} horizontal={false} />
                        <XAxis dataKey="month" type="auto" tickLine={false} axisLine={false} />
                        <YAxis dataKey="revenue" tickLine={false} axisLine={false} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line dataKey="revenue" type="linear" dot={false} strokeWidth={2} />
                        <RechartsDevtools />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
