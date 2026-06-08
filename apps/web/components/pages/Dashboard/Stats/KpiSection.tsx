import {type ComponentProps} from 'react';
import {GetDashboardPageDataResult} from '@/app/dashboard/actions';
import {cn} from '@/lib/utils';
import {KpiCard} from './KpiCard';

interface KpiSectionProps {
    ContainerProps?: ComponentProps<'div'>;
    totalEvents: number;
    totalCategories: number;
    categories: GetDashboardPageDataResult['categories'];
}

export function KpiSection(props: KpiSectionProps) {
    const {totalCategories, totalEvents, categories, ContainerProps = {}} = props;
    const {className: customContainerClassName} = ContainerProps;
    const average = (totalEvents / totalCategories).toFixed(1);

    return (
        <div className={cn('grid grid-cols-2 sm:grid-cols-4', customContainerClassName)}>
            <KpiCard title="Total Events" value={totalEvents} />
            <KpiCard title="Categories" value={totalCategories} />
            <KpiCard title="Avg per category" value={average} />
            <KpiCard title="Top category" value={categories?.[0].name} />
        </div>
    );
}
