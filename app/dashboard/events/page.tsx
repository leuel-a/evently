import {DataTable} from '@/components/blocks/DataTable';
import {getUserEvents} from './actions';
import {columns} from './columns';

export default async function Page() {
    const {success, data: events} = await getUserEvents();

    if (!success) {
        return <div>Whoops, fetching events failed!</div>;
    }

    return (
        <div className="mx-auto py-10">
            <DataTable
                columns={columns}
                data={events}
            />
        </div>
    );
}
