'use client';

import {Fragment} from 'react';
import {Bar, BarChart, BarShapeProps, CartesianGrid, Rectangle, XAxis, YAxis} from 'recharts';
import {RechartsDevtools} from '@recharts/devtools';
import {cn} from '@/lib/utils';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {GetDashboardPageDataResult} from '@/app/dashboard/actions';
import {CATEGORY_COLORS, getCategoryColor} from './utils';

interface EventsByCategoryChartProps {
    totalEvents: number;
    totalCategories: number;
    categories: GetDashboardPageDataResult['categories'];
}

const chartConfig = {
    count: {
        label: 'Events',
        color: CATEGORY_COLORS.minimal,
    },
} satisfies ChartConfig;

export function EventsByCategoryBarChart(props: EventsByCategoryChartProps) {
    const {categories, totalEvents} = props;

    const chartData = categories?.map((category) => ({
        name: category.name,
        count: category.count,
        percent: Math.round((category.count / totalEvents) * 100),
    }));

    const chartHeight = (chartData?.length ?? 0) * 48 + 16;

    const CategoryBar = (props: BarShapeProps) => {
        const count = (props as any).count as number;
        return (
            <Rectangle
                {...props}
                fill={getCategoryColor(count, totalEvents)}
                opacity={count === 0 ? 0.45 : 1}
            />
        );
    };

    return (
        <Fragment>
            <ChartContainer config={chartConfig} className={cn(`min-h-[${chartHeight}px]`)}>
                <BarChart
                    layout="vertical"
                    data={chartData}
                    accessibilityLayer
                    barCategoryGap="30%"
                >
                    <CartesianGrid
                        vertical={true}
                        horizontal={false}
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        opacity={0.6}
                    />
                    <XAxis
                        dataKey="count"
                        hide={false}
                        type="number"
                        domain={[0, 'dataMax']}
                        tick={{
                            fontSize: 10,
                            fill: 'hsl(var(--muted-foreground))',
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickCount={5}
                    />
                    <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fontSize: 12,
                            fill: 'hsl(var(--foreground))',
                            fontWeight: 500,
                        }}
                    />
                    <ChartTooltip
                        cursor={{fill: 'hsl(var(--muted))', opacity: 0.5, radius: 4}}
                        content={
                            <ChartTooltipContent
                                formatter={(value, _, item) => {
                                    const count = Number(value);
                                    const color = getCategoryColor(count, totalEvents);
                                    return (
                                        <span className="flex items-center gap-1.5">
                                            <span
                                                className="inline-block h-2 w-2 rounded-full shrink-0"
                                                style={{backgroundColor: color}}
                                            />
                                            <span>
                                                {count} event{count !== 1 ? 's' : ''}
                                                <span className="ml-1 text-muted-foreground">
                                                    · {item.payload.percent}%
                                                </span>
                                            </span>
                                        </span>
                                    );
                                }}
                                hideLabel
                            />
                        }
                    />
                    <Bar
                        dataKey="count"
                        fill="var(--color-count)"
                        radius={[0, 5, 5, 0]}
                        shape={CategoryBar}
                    />
                    <RechartsDevtools />
                </BarChart>
            </ChartContainer>
        </Fragment>
    );
}
