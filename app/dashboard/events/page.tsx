import {EventsTable} from '@/components/pages/dashboard/Events/EventsTable';
import {FilterEventsTable} from '@/components/pages/dashboard/Events/FilterEventsTable';
import {getUserEvents, getUserEventsCategories} from '../actions';

export interface PageProps {
    searchParams?: Promise<{
        q?: string;
        filters?: string;
    }>;
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;

    const {data: eventCategories} = await getUserEventsCategories();
    const {success: getUserEventsSuccess, data: events} = await getUserEvents(searchParams);

    return (
        <div className="mx-auto py-10">
            <FilterEventsTable categories={eventCategories ?? []} />
            {!getUserEventsSuccess ? (
                <div className="">Whoops, fetching events failed!</div>
            ) : (
                <EventsTable events={events ?? []} />
            )}
        </div>
    );
}
