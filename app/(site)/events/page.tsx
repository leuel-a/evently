import {Fragment} from 'react';
import {EventsPagination, FiltersEvent} from '@/components/pages/(site)';
import {EventsContainer, NoEventsFound} from '@/components/pages/(site)';
import {getEvents} from '../actions';

export interface PageProps {
    searchParams?: Promise<{
        q?: string;
        page?: string;
        limit?: string;
        filters?: string;
    }>;
}

export default async function Page(props: PageProps) {
    const params = await props.searchParams;
    const {success, data} = await getEvents(params);

    return (
        <div className="w-5/6 md:w-4/6 mx-auto">
            <main className="flex flex-col gap-4">
                <FiltersEvent />
                {success && data ? (
                    <Fragment>
                        <EventsContainer events={data.data} />
                        <EventsPagination total={data.total} />
                    </Fragment>
                ) : (
                    <NoEventsFound />
                )}
            </main>
        </div>
    );
}
