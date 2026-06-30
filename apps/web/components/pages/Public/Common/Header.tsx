import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {GetEventsPageResult} from '@/app/events/actions';
import {APP_ROUTES} from '@/config/routes';

interface HeaderProps {
    data: GetEventsPageResult['data'] | undefined;
}

const authLink = (path: string) => `${path}?organizer=false`;

export function Header({data}: HeaderProps) {
    const total = data?.length ?? 0;
    const free = data?.filter((e) => e.isFree).length ?? 0;
    const virtual = data?.filter((e) => e.isVirtual).length ?? 0;

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <Link
                        href={APP_ROUTES.events.base}
                        className="text-base font-semibold text-slate-900 tracking-tight"
                    >
                        Evently
                    </Link>

                    <div className="flex items-center gap-6">
                        <nav className="hidden sm:flex items-center gap-5 text-sm text-slate-500">
                            <Link href={APP_ROUTES.events.base} className="text-indigo-600 font-medium">
                                Events
                            </Link>
                        </nav>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-sm text-slate-600 hover:text-slate-900" asChild>
                                <Link href={authLink(APP_ROUTES.auth.login)}>Sign in</Link>
                            </Button>
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md" asChild>
                                <Link href={authLink(APP_ROUTES.auth.signup)}>Sign up</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-100">
                <h1 className="text-2xl font-bold text-slate-900">Discover Events</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Browse concerts, workshops, meetups, and more.
                </p>

                {data && (
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700 divide-x divide-slate-200">
                        <Stat value={total} label={total !== 1 ? 'events' : 'event'} />
                        <Stat value={free} label="free" valueClass="text-emerald-600" />
                        <Stat value={virtual} label="virtual" valueClass="text-indigo-600" />
                    </div>
                )}
            </div>
        </header>
    );
}

function Stat({value, label, valueClass = 'text-slate-900'}: {
    value: number;
    label: string;
    valueClass?: string;
}) {
    return (
        <span className="pl-6 first:pl-0">
            <span className={`font-semibold ${valueClass}`}>{value}</span> {label}
        </span>
    );
}
