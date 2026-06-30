import {Search, MapPin, CalendarDays} from 'lucide-react';

const cards = [
    {
        icon: Search,
        title: 'Search by anything',
        body: "City, category, date range, or the artist's name. Results narrow as you type.",
    },
    {
        icon: MapPin,
        title: "Sorted by what's near",
        body: 'Distance-aware results so the Saturday night option down the street surfaces first.',
    },
    {
        icon: CalendarDays,
        title: 'A calendar that fills itself',
        body: 'Save an event and it lands on your calendar with the venue, time, and a map pin.',
    },
];

export function DiscoverSection() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-6xl px-6 py-24">
                <div className="max-w-xl">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-500">
                        Discover
                    </p>
                    <h2 className="mt-3 font-serif text-4xl tracking-tight text-indigo-950">
                        Finding the right event shouldn't feel like work.
                    </h2>
                    <p className="mt-4 text-indigo-950/60">
                        Evently indexes every event the moment it's published, so the search bar is
                        never out of date.
                    </p>
                </div>

                <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-100 sm:grid-cols-3">
                    {cards.map(({icon: Icon, title, body}) => (
                        <div key={title} className="bg-white p-8">
                            <Icon className="size-5 text-indigo-500" strokeWidth={1.5} />
                            <h3 className="mt-5 font-medium text-indigo-950">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-indigo-950/60">
                                {body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
