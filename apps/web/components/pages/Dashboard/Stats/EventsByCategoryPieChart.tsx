'use client';

import {Fragment, useMemo} from 'react';
import {Pie, PieChart} from 'recharts';
import {RechartsDevtools} from '@recharts/devtools';
import {cn} from '@/lib/utils';
import {GetDashboardPageDataResult} from '@/app/dashboard/actions';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {getCategoryColor} from './utils';

interface EventsbyCategoryPieChartProps {
    totalCategories: number;
    totalEvents: number;
    categories: GetDashboardPageDataResult['categories'];
}

export function EventsByCategoryPieChart(props: EventsbyCategoryPieChartProps) {
    const {categories, totalEvents} = props;
    const chartConfig = useMemo(() => {
        return categories.reduce<ChartConfig>((acc, category, _index) => {
            acc[category.name] = {
                label: category.name,
                color: getCategoryColor(category.count, totalEvents),
            };
            return acc;
        }, {});
    }, [categories]);

    const chartHeight = (categories?.length ?? 0) * 48 + 16;
    const chartData = categories?.map((category) => {
        return {
            count: category?.count,
            name: category?.name,
            fill: getCategoryColor(category?.count ?? 0, totalEvents),
        };
    });

    return (
        <Fragment>
            <ChartContainer config={chartConfig} className={cn(`min-h-[${chartHeight}px]`)}>
                <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Pie data={chartData} dataKey="count" nameKey="name" />
                    <RechartsDevtools />
                </PieChart>
            </ChartContainer>
        </Fragment>
    );
}
