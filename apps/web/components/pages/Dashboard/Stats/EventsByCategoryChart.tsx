'use client';

import {GetDashboardPageDataResult} from '@/app/dashboard/actions';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {Bar, BarChart, Cell, XAxis, YAxis} from 'recharts';
import {ComponentProps} from 'react';

interface EventsByCategoryChartProps {
    CardProps?: ComponentProps<typeof Card>;
    totalEvents: number;
    categories: GetDashboardPageDataResult['categories'];
}

const chartConfig = {
    count: {
        label: 'Events',
    },
} satisfies ChartConfig;

// Maps count → CSS variable color so it respects shadcn theming
function getBarFill(count: number): string {
    if (count >= 3) return 'hsl(var(--chart-1))';
    if (count === 2) return 'hsl(var(--chart-2))';
    return 'hsl(var(--chart-3))';
}

export function EventsByCategoryChart(props: EventsByCategoryChartProps) {
    const {categories, totalEvents, CardProps = {}} = props;

    const chartData = categories?.map((cat) => ({
        name: cat.name,
        count: cat.count,
        percent: Math.round((cat.count / totalEvents) * 100),
    }));

    // Approximate height: 48px per bar + padding
    const chartHeight = (chartData?.length ?? 0) * 48 + 16;

    return (
        <Card {...CardProps}>
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Events by category
                </CardTitle>
            </CardHeader>
            <CardContent className="pr-2">
                <ChartContainer config={chartConfig} style={{height: chartHeight}}>
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{top: 0, right: 48, bottom: 0, left: 0}}
                        barCategoryGap="30%"
                    >
                        <XAxis
                            type="number"
                            dataKey="count"
                            hide
                            domain={[0, 'dataMax']}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={172}
                            tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}}
                            tickLine={false}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    formatter={(value, name, item) =>
                                        `${value} event${Number(value) !== 1 ? 's' : ''} · ${item.payload.percent}%`
                                    }
                                    hideLabel
                                />
                            }
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]} minPointSize={4}>
                            {chartData?.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={getBarFill(entry.count)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
