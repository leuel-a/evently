import {Suspense} from 'react';
import {DataTable as EventTable, TablePagination} from '@/components/pages/Dashboard/Common';
import {FilterEventsTable} from '@/components/pages/Dashboard/Events/FilterEventsTable';
import {LoadingSpinner} from '@/components/blocks/Common/LoadingSpinner';
import {getEventsPageData} from './actions';
import {columns} from './columns';

interface PageProps {
    searchParams: Promise<Record<string, string>>;
}

export default async function Page(props: PageProps) {
    const params = await props.searchParams;
    const {success, data, error} = await getEventsPageData(params);

    // TODO: create a common component to show errors

    return (
        <Suspense fallback={<LoadingSpinner />}>
            {error && <div>Error: {}</div>}
            {success && data && (
                <div className="mx-auto py-10">
                    <FilterEventsTable categories={data?.settings?.categories || []} />
                    <EventTable data={data?.events?.data || []} columns={columns} />
                    <TablePagination
                        page={data?.events?.page}
                        limit={data?.events?.limit}
                        hasNextPage={data?.events?.hasNextPage}
                        hasPreviousPage={data?.events?.hasPreviousPage}
                    />
                </div>
            )}
        </Suspense>
    );
}
