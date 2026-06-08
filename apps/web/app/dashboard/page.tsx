import {Suspense} from 'react';
import {getDashboardPageData} from './actions';
import {LoadingSpinner} from '@/components/blocks/Common/Loading';
import {
    KpiSection,
    EventsByCategoryChart,
    TicketRevenueChart,
} from '@/components/pages/Dashboard/Stats';

export default async function Page() {
    const {success, data} = await getDashboardPageData();
    return (
        <Suspense fallback={<LoadingSpinner />}>
            {success && data && (
                <div className="space-y-6">
                    <KpiSection
                        ContainerProps={{className: 'gap-3'}}
                        totalEvents={data?.data?.totalEvents}
                        totalRevenue={data?.data?.tickets?.totalRevenue}
                        totalCategories={data?.data?.totalCategories}
                        categories={data?.data?.categories}
                    />
                    <div className="grid grid-cols-12 gap-3">
                        <TicketRevenueChart
                            CardProps={{className: 'col-span-12 lg:col-span-6'}}
                            revenueData={data?.data?.tickets?.revenues ?? []}
                        />
                        <EventsByCategoryChart
                            CardProps={{className: 'col-span-12 lg:col-span-6'}}
                            categories={data?.data?.categories}
                            totalEvents={data?.data?.totalEvents}
                            totalCategories={data?.data?.totalCategories}
                        />
                    </div>
                </div>
            )}
        </Suspense>
    );
}
