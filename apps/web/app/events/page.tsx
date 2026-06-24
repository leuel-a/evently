import {EventsHeader} from '@/components/pages/Public/Common';
import {EventCard} from '@/components/pages/Public/Events/EventCard';
import {getEvents} from './actions';
import {NoEvents} from '@/components/pages/Public/Events';
import {FailedToLoadEvents} from '@/components/pages/Public/Events';
import {FilterEvents} from '@/components/pages/Public/Events';

interface PageProps {
    searchParams: Promise<Record<string, string>>;
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const {success, data, error} = await getEvents(searchParams);

    return (
        <main className="min-h-screen bg-[#f8f8fc]">
            <EventsHeader data={data?.data} />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <FilterEvents categories={[]} />
                {!success && <FailedToLoadEvents error={error} />}
                {success && (!data?.data || data?.data?.length === 0) && <NoEvents />}
                {success && data?.data && data?.data?.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {data.data.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
