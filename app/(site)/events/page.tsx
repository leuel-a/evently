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
        <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="absolute inset-0 -z-10 bg-zinc-900">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl" />
            </div>

            <main className="flex flex-col gap-8 relative z-10">
                <FiltersEvent />

                {success && data && data.data.length > 0 ? (
                    <Fragment>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold dark:text-white text-zinc-900">
                                Discover Events
                                {data.total > 0 && (
                                    <span className="text-zinc-500 dark:text-zinc-400 text-lg font-normal ml-2">
                                        ({data.total} found)
                                    </span>
                                )}
                            </h2>
                        </div>

                        <EventsContainer events={data.data} />

                        {data.total > data.data.length && (
                            <div className="flex justify-center mt-8">
                                <EventsPagination total={data.total} />
                            </div>
                        )}
                    </Fragment>
                ) : (
                    <NoEventsFound />
                )}
            </main>
        </div>
    );
}
