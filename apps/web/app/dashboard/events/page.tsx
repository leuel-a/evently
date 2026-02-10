import {FilterEventsTable} from '@/components/pages/Dashboard/FilterEventsTable';
import {DataTable as EventTable} from './data-table';
import {getEventsPageData} from './actions';
import {columns} from './columns';

export default async function Page() {
    const {events, settings} = await getEventsPageData();

    return (
        <div className="mx-auto py-10">
            <FilterEventsTable categories={settings?.category?.all || []} />
            <EventTable data={events?.data || []} columns={columns} />
        </div>
    );
}
