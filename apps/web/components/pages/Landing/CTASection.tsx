import {Button} from '@/components/ui/button';
import {ArrowRight} from 'lucide-react';

export function CTASection() {
    return (
        <section className="bg-indigo-50">
            <div className="mx-auto max-w-6xl px-6 py-24 text-center">
                <h2 className="font-serif text-4xl tracking-tight text-indigo-950 sm:text-5xl">
                    Your next event is one
                    <span className="italic text-indigo-500"> page </span>
                    away.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-indigo-950/60">
                    Free to list. No setup fee, no monthly minimum.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500">
                        Create your first event
                        <ArrowRight className="size-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-indigo-200">
                        Browse events
                    </Button>
                </div>
            </div>
        </section>
    );
}
