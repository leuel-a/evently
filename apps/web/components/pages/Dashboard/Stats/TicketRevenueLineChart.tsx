'use client';

import {Line, LineChart, CartesianGrid, XAxis, YAxis} from 'recharts';
import {RechartsDevtools} from '@recharts/devtools';
import {GetDashboardPageDataResult} from '@/app/dashboard/actions';
import {
    ChartContainer,
    ChartConfig,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {cn} from '@/lib/utils';
import {normalizeRevenueData} from './utils';

interface TicketRevenueLineChartProps {
    year: number;
    revenueData: GetDashboardPageDataResult['tickets']['revenues'];
}

const chartConfig = {
    revenue: {
        label: 'Revenue',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function TicketRevenueLineChart(props: TicketRevenueLineChartProps) {
    const {year: selectedYear, revenueData} = props;

    const normalizedData = normalizeRevenueData(revenueData);
    const chartData = normalizedData.filter((data) => data?.year == selectedYear);
    const chartHeight = (chartData?.length ?? 0) * 48 + 16;

    return (
        <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={chartData} className={cn(`min-h-[${chartHeight}]`)}>
                <CartesianGrid vertical={true} horizontal={false} />
                <XAxis dataKey="month" type="auto" tickLine={false} axisLine={false} />
                <YAxis dataKey="revenue" tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line dataKey="revenue" type="linear" dot={false} strokeWidth={2} />
                <RechartsDevtools />
            </LineChart>
        </ChartContainer>
    );
}
