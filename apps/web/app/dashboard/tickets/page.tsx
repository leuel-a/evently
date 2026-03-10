import {Suspense} from 'react';
import {LoadingSpinner} from '@/components/blocks/Common/LoadingSpinner';
import {DataTable as TicketsTable, TablePagination} from '@/components/pages/Dashboard/Common';
import {columns} from './columns';
import {getTicketsPageData} from './actions';
import {FilterTicketsTable} from '@/components/pages/Dashboard/Tickets/FilterTicketsTable';

export interface PageProps {
    searchParams: Promise<{status: string}>;
}

export default async function Page(props: PageProps) {
    const params = await props.searchParams;
    const {success, data, error} = await getTicketsPageData(params);

    return (
        <Suspense fallback={<LoadingSpinner />}>
            {error && <div>Error: {}</div>}
            {success && data && (
                <div className="mx-auto py-10">
                    <FilterTicketsTable />
                    <TicketsTable data={data?.tickets?.data || []} columns={columns} />
                    <TablePagination
                        page={data?.tickets?.page}
                        limit={data?.tickets?.limit}
                        hasNextPage={data?.tickets?.hasNextPage}
                        hasPreviousPage={data?.tickets?.hasPreviousPage}
                    />
                </div>
            )}
        </Suspense>
    );
}
