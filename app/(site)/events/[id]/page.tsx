import {Undo2} from 'lucide-react';
import NextLink from 'next/link';
import {EventPageContent} from '@/components/pages/(site)';
import {Button} from '@/components/ui/button';
import {APP_ROUTES} from '@/config/routes';
import {getEventById} from '../../actions';

interface PageProps {
    params: Promise<{id: string}>;
}

export default async function Page(props: PageProps) {
    const {id} = await props.params;
    const {success, data: event} = await getEventById(id);

    if (!success || !event) {
        return <div></div>;
    }

    return (
        <div className="w-5/6 md:w-4/6 max-w-[100rem] flex flex-col gap-4 mx-auto">
            <Button
                asChild
                variant="outline"
                className="group w-40 mt-10 relative bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 hover:border-indigo-500 text-zinc-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden"
            >
                <NextLink
                    href={APP_ROUTES.events.base}
                    className="flex items-center gap-3"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                    <Undo2 className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-zinc-900" />
                    <span className="font-medium group-hover:text-zinc-900">Back to Events</span>
                </NextLink>
            </Button>
            <div className="flex flex-col xl:flex-row gap-10 items-start mx-auto my-10">
                {!success || !event ? <></> : <EventPageContent event={event} />}
            </div>
        </div>
    );
}
