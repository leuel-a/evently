import {Suspense} from 'react';
import {getDashboardPageData} from './actions';
import {LoadingSpinner} from '@/components/blocks/Common/Loading';
import {EventsByCategoryChart, KpiSection} from '@/components/pages/Dashboard/Stats';

export default async function Page() {
    const {success, data} = await getDashboardPageData();

    return (
        <Suspense fallback={<LoadingSpinner />}>
            {success && data && (
                <div className="space-y-6">
                    <KpiSection
                        totalEvents={data?.data?.totalEvents}
                        totalCategories={data?.data?.totalCategories}
                        categories={data?.data?.categories}
                    />
                    <EventsByCategoryChart
                        CardProps={{className: 'w-1/2'}}
                        categories={data?.data?.categories}
                        totalEvents={data?.data?.totalEvents}
                    />
                </div>
            )}
        </Suspense>
    );
}
