import {FilterTable} from '@/components/blocks/FilterTable';
import {EventsTable} from '@/components/pages/dashboard/Events/EventsTable';
import {getUserEvents} from '../actions';

export interface PageProps {
    searchParams?: Promise<{
        q?: string;
    }>;
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const {success, data: events} = await getUserEvents(searchParams);

    return (
        <div className="mx-auto py-10">
            <FilterTable />
            {!success ? (
                <div className="">Whoops, fetching events failed!</div>
            ) : (
                <EventsTable events={events ?? []} />
            )}
        </div>
    );
}
