import {Search, CreditCard, MailCheck} from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: 'Find it',
        body: 'Browse by city or category, or search for the event by name.',
    },
    {
        icon: CreditCard,
        title: 'Buy it',
        body: 'A checkout built for one purpose: getting you a ticket in three taps.',
    },
    {
        icon: MailCheck,
        title: 'Get confirmed',
        body: 'Your ticket and QR code land in your inbox before the page even finishes redirecting.',
    },
];

export function AttendeeSection() {
    return (
        <section className="bg-indigo-50">
            <div className="mx-auto max-w-6xl px-6 py-24">
                <div className="max-w-xl">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-500">
                        For attendees
                    </p>
                    <h2 className="mt-3 font-serif text-4xl tracking-tight text-indigo-950">
                        From "tell me more" to "I'm in" — fast.
                    </h2>
                </div>

                <div className="relative mt-16 grid gap-12 sm:grid-cols-3">
                    <div
                        className="absolute top-6 left-0 right-0 hidden h-px bg-indigo-200 sm:block"
                        aria-hidden
                    />
                    {steps.map(({icon: Icon, title, body}, _) => (
                        <div key={title} className="relative bg-indigo-50">
                            <div className="flex size-12 items-center justify-center rounded-full border border-indigo-200 bg-white">
                                <Icon className="size-5 text-indigo-500" strokeWidth={1.5} />
                            </div>
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
