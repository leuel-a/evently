import {Suspense} from 'react';
import {getEventsCategoryPageData} from './actions';
import {LoadingSpinner} from '@/components/blocks/Common/LoadingSpinner';
import {FilterEventsCategoryTable} from '@/components/pages/Dashboard/EventsCategory';
import {
    DataTable as EventsCategoryTable,
    TablePagination,
} from '@/components/pages/Dashboard/Common';
import {columns} from './columns';

interface PageProps {
    searchParams: Promise<Record<string, string>>;
}

export default async function Page(props: PageProps) {
    const params = await props.searchParams;
    const {success, data, error} = await getEventsCategoryPageData(params);

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <div className="mx-auto py-10 px-4">
                {error && (
                    <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                        Error: {error.message}
                    </div>
                )}
                {success && data && (
                    <div className="py-10">
                        <FilterEventsCategoryTable />
                        <EventsCategoryTable
                            columns={columns}
                            data={data?.eventsCategory?.data || []}
                        />
                        <TablePagination
                            page={data?.eventsCategory?.page}
                            limit={data?.eventsCategory?.limit}
                            hasNextPage={data?.eventsCategory?.hasNextPage}
                            hasPreviousPage={data?.eventsCategory?.hasPreviousPage}
                        />
                    </div>
                )}
            </div>
        </Suspense>
    );
}
