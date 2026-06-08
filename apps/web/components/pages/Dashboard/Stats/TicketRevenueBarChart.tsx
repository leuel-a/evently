import {BarChart, Bar, CartesianGrid, XAxis, YAxis} from 'recharts';
import {
    ChartContainer,
    ChartConfig,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {GetDashboardPageDataResult} from '@/app/dashboard/actions';
import {normalizeRevenueData} from './utils';
import {cn} from '@/lib/utils';

interface TicketRevenueBarChartProps {
    year: number;
    revenueData: GetDashboardPageDataResult['ticketsRevenueByMonth'];
}

const chartConfig = {
    revenue: {
        label: 'Revenue',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function TicketRevenueBarChart(props: TicketRevenueBarChartProps) {
    const {year: selectedYear, revenueData} = props;

    const normalizedData = normalizeRevenueData(revenueData);
    const chartData = normalizedData.filter((data) => data?.year == selectedYear);
    const chartHeight = (chartData?.length ?? 0) * 48 + 16;

    return (
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData} className={cn(`min-h-[${chartHeight}]`)}>
                <CartesianGrid vertical={false} horizontal={true} />
                <XAxis dataKey="month" type="auto" tickLine={false} axisLine={false} />
                <YAxis dataKey="revenue" tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--chart-3)" radius={[5, 5, 0, 0]} />
            </BarChart>
        </ChartContainer>
    );
}
