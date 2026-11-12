import NextLink from 'next/link';
import { AlertCircle, ArrowRight } from 'lucide-react'
import {APP_ROUTES} from '@/config/routes';

export function EventNotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-indigo-950 px-4 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10">
                <AlertCircle className="size-7 text-indigo-300" strokeWidth={1.5} />
            </div>
            <div>
                <h1 className="font-serif text-2xl text-white">Event not found</h1>
                <p className="mt-2 text-sm text-indigo-300/60">
                    This event may have been removed or the link is incorrect.
                </p>
            </div>
            <NextLink
                href={APP_ROUTES.events?.base ?? '/events'}
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-indigo-400 underline-offset-2 hover:underline"
            >
                Browse all events <ArrowRight className="size-3.5" />
            </NextLink>
        </div>

    )
}
