import NextLink from 'next/link';
import {Button} from '@/components/ui/button';
import {ArrowRight, Ticket} from 'lucide-react';
import {APP_ROUTES} from '@/config/routes';

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-indigo-950 text-indigo-50">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-36">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
                        <Ticket className="size-3.5" />
                        Evently
                    </span>

                    <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl">
                        Every event has a
                        <br />
                        <span className="italic text-indigo-300">story</span> worth selling out.
                    </h1>

                    <p className="mt-6 max-w-md text-lg leading-relaxed text-indigo-200/80">
                        Evently is where organizers build the box office and attendees find the
                        door. Pricing, promo codes, and checkout on one side. Search, tickets, and
                        confirmations on the other.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <NextLink href={APP_ROUTES.dashboard.base}>
                            <Button
                                type="button"
                                size="lg"
                                className="cursor-pointer bg-indigo-400 text-indigo-950 hover:bg-indigo-300"
                            >
                                Start hosting
                                <ArrowRight className="size-4" />
                            </Button>
                        </NextLink>
                        <NextLink style={{cursor: 'pointer'}} href={APP_ROUTES.events.base}>
                            <Button
                                type="button"
                                size="lg"
                                variant="ghost"
                                className="cursor-pointer text-indigo-100 hover:bg-white/5 hover:text-white hover:border hover:border-white"
                            >
                                Browse events
                            </Button>
                        </NextLink>
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-sm">
                    <div className="relative rounded-2xl bg-indigo-50 text-indigo-950 shadow-2xl shadow-indigo-950/50">
                        <span className="absolute left-0 top-30 size-5 -translate-x-1/2 rounded-full bg-indigo-950" />
                        <span className="absolute right-0 top-30 size-5 translate-x-1/2 rounded-full bg-indigo-950" />

                        <div className="flex items-center justify-between border-b border-dashed border-indigo-300 px-6 py-5">
                            <div>
                                <p className="font-serif text-lg italic">Founders Night</p>
                                <p className="text-xs uppercase tracking-[0.15em] text-indigo-500">
                                    Admit One
                                </p>
                            </div>
                            <Ticket className="size-6 text-indigo-400" strokeWidth={1.5} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-6 py-5 text-xs">
                            <div>
                                <p className="uppercase tracking-[0.15em] text-indigo-400">Date</p>
                                <p className="mt-1 font-medium">Sat, Aug 22</p>
                            </div>
                            <div>
                                <p className="uppercase tracking-[0.15em] text-indigo-400">Venue</p>
                                <p className="mt-1 font-medium">Skylight Hall</p>
                            </div>
                            <div>
                                <p className="uppercase tracking-[0.15em] text-indigo-400">Tier</p>
                                <p className="mt-1 font-medium">Early Bird</p>
                            </div>
                            <div>
                                <p className="uppercase tracking-[0.15em] text-indigo-400">Code</p>
                                <p className="mt-1 font-medium">FOUND25</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-6 py-5">
                            <p className="font-serif text-2xl">$45.00</p>
                            <p className="text-xs text-indigo-500">#EV-0042</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
