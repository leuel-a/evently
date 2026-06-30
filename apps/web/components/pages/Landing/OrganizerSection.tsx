import {LayoutDashboard, Tag, TrendingUp, Activity} from 'lucide-react';

const features = [
    {
        icon: LayoutDashboard,
        title: 'Build the event in minutes',
        body: 'Title, venue, capacity, ticket tiers. Publish a draft, then refine it as RSVPs come in.',
    },
    {
        icon: Tag,
        title: 'Promo codes and discounts',
        body: 'Set percentage or flat-rate codes, cap redemptions, and restrict them to a ticket tier or date window.',
    },
    {
        icon: TrendingUp,
        title: 'Scheduled price increments',
        body: 'Early bird today, full price next week. Set the schedule once and Evently raises the price automatically.',
    },
    {
        icon: Activity,
        title: 'Live activity, not a CSV export',
        body: 'Watch sales, check-ins, and refunds as they happen, broken out by ticket type.',
    },
];

export function OrganizerSection() {
    return (
        <section className="bg-indigo-950 text-indigo-50">
            <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
                        For organizers
                    </p>
                    <h2 className="mt-3 font-serif text-4xl tracking-tight text-white">
                        Run the box office,{' '}
                        <span className="italic text-indigo-300">not the spreadsheet.</span>
                    </h2>
                    <p className="mt-4 text-indigo-200/70">
                        Everything between "I have an idea" and "I have a sold-out room" lives in
                        one place: the event, the checkout, the pricing rules.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                    {features.map(({icon: Icon, title, body}) => (
                        <div key={title} className="border-l border-indigo-400/30 pl-5">
                            <Icon className="size-5 text-indigo-300" strokeWidth={1.5} />
                            <h3 className="mt-4 font-medium text-white">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-indigo-200/60">
                                {body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
