import {DataTable} from '@/components/blocks/DataTable';
import {getUserEvents} from './actions';
import {columns} from './columns';

export const dynamic = 'force-static';

export default async function Page() {
    const {success, data: events} = await getUserEvents();

    return (
        <div className="mx-auto py-10">
            {success ? (
                <div className="bg-red-800">Whoops, fetching events failed!</div>
            ) : (
                <DataTable
                    columns={columns}
                    data={events}
                />
            )}
        </div>
    );
}
