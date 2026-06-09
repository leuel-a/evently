'use client';

import {useState, type ComponentProps} from 'react';
import {RECHARTS_DEVTOOLS_PORTAL_ID} from '@recharts/devtools';
import {GetDashboardPageDataResult} from '@/app/dashboard/actions';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {SelectEventsByCategoryChart} from './SelectEventsByCategoryChart';
import {EventsByCategoryPieChart} from './EventsByCategoryPieChart';
import {EventsByCategoryBarChart} from './EventsByCategoryBarChart';
import {CategoryLegend} from './utils';

interface EventsByCategoryChartProps {
    CardProps?: ComponentProps<typeof Card>;
    totalEvents: number;
    totalCategories: number;
    categories: GetDashboardPageDataResult['categories'];
}

const DEFAULT_CHART_VALUE = 'pie';

export function EventsByCategoryChart(props: EventsByCategoryChartProps) {
    const [chart, setChart] = useState<string>(DEFAULT_CHART_VALUE);
    const {categories, totalEvents, totalCategories, CardProps = {}} = props;
    const {className: customCardClassName, ...cardProps} = CardProps;

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
                    Events by category
                </CardTitle>
                <div className='flex gap-2'>
                    <SelectEventsByCategoryChart
                        defaultValue={DEFAULT_CHART_VALUE}
                        onChange={setChart}
                    />
                </div>
            </CardHeader>
            <CardContent className="pr-3 pl-5 pb-4">
                <CategoryLegend totalCategories={totalEvents} />
                {chart === 'pie' && (
                    <EventsByCategoryPieChart
                        categories={categories}
                        totalEvents={totalEvents}
                        totalCategories={totalCategories}
                    />
                )}
                {chart === 'bar' && (
                    <EventsByCategoryBarChart
                        categories={categories}
                        totalEvents={totalEvents}
                        totalCategories={totalEvents}
                    />
                )}
            </CardContent>
        </Card>
    );
}
