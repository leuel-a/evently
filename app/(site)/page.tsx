import {Event, FiltersEvent} from '@/components/pages/(site)';
import prisma from '@/lib/db/prisma';

export default async function Page(props: {
    searchParams?: Promise<{
        q?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const events = await prisma.events.findMany({
        where: {
            OR: [{title: {contains: searchParams?.q, mode: 'insensitive'}}, {description: {contains: searchParams?.q, mode: 'insensitive'}}],
        },
    });

    return (
        <div className="w-5/6 md:w-4/6 mx-auto">
            <main className="mt-10 flex flex-col gap-4">
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
