import {Suspense} from 'react';
import {FilterEventsTable} from '@/components/pages/Dashboard/FilterEventsTable';
import {LoadingSpinner} from '@/components/blocks/Common/LoadingSpinner';
import {DataTable as EventTable} from './data-table';
import {getEventsPageData} from './actions';
import {columns} from './columns';

export default async function Page() {
    const {success, data, error} = await getEventsPageData();

    return (
        <Suspense fallback={<LoadingSpinner />}>
            {error && <div>Error: {}</div>}
            {success && data && (
                <div className="mx-auto py-10">
                    <FilterEventsTable categories={data?.settings?.category?.all || []} />
                    <EventTable data={data?.events?.data || []} columns={columns} />
                </div>
            )}
        </Suspense>
    );
}
