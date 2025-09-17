import {EventsPagination, FiltersEvent} from '@/components/pages/(site)';
import {EventsGrid} from '@/components/pages/(site)';
import {getEvents} from './actions';

export interface PageProps {
    searchParams?: Promise<{
        q?: string;
        page?: string;
        limit?: string;
        categories?: string;
    }>;
}

export default async function Page(props: PageProps) {
    const params = await props.searchParams;
    const {success, data} = await getEvents(params);

    if (!success || !data) {
        return <div>Whoops, something went wrong. Please refetch the page.</div>;
    }

    const {data: events, total: totalEvents} = data;
    return (
        <div className="w-5/6 md:w-4/6 mx-auto">
            <main className="flex flex-col gap-4">
                <FiltersEvent />
                <EventsGrid events={events} />
                <EventsPagination total={totalEvents} />
            </main>
        </div>
    );
}
