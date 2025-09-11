import {Event, FiltersEvent} from '@/components/pages/(site)';
import {getEvents} from './actions';

export interface PageProps {
    searchParams?: Promise<{
        q?: string;
        categories?: string;
    }>;
}

export default async function Page(props: PageProps) {
    const params = await props.searchParams;
    const {success, data: events} = await getEvents(params);

    if (!success || !events) {
        return <div>Whoops, something went wrong. Please refetch the page.</div>;
    }

    return (
        <div className="w-5/6 md:w-4/6 mx-auto">
            <main className="flex flex-col gap-4">
                <FiltersEvent />
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {events.map((event) => (
                        <Event
                            key={event.id}
                            event={event}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
