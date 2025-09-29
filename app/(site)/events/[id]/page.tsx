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
        <div className="w-5/6 md:w-4/6 flex flex-col gap-4 mx-auto">
            <Button
                asChild
                className="w-fit"
                variant="outline"
            >
                <NextLink href={APP_ROUTES.events.base}>
                    <Undo2
                        width={80}
                        height={80}
                    />
                </NextLink>
            </Button>
            <div className="flex flex-col xl:flex-row gap-10 items-start mx-auto">
                {!success || !event ? <></> : <EventPageContent event={event} />}
            </div>
        </div>
    );
}
