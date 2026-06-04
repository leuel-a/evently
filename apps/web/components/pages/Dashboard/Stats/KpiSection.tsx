import { GetDashboardPageDataResult } from '@/app/dashboard/actions';
import {KpiCard} from './KpiCard';

interface KpiSectionProps {
    totalEvents: number;
    totalCategories: number;
    categories: GetDashboardPageDataResult['categories'];
}

export function KpiSection(props: KpiSectionProps) {
    const {totalCategories, totalEvents, categories} = props;
    const average = (totalEvents / totalCategories).toFixed(1);

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <KpiCard title="Total Events" value={totalEvents} />
            <KpiCard title="Categories" value={totalCategories} />
            <KpiCard title="Avg per category" value={average} />
            <KpiCard title="Top category" value={categories?.[0].name} />
        </div>
    );
}
