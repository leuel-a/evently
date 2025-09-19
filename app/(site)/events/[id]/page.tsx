import {EventPageContent} from '@/components/pages/(site)';
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
        <div className="w-5/6 md:w-4/6 flex flex-col xl:flex-row gap-10 items-start mx-auto">
            {!success || !event ? <></> : <EventPageContent event={event} />}
        </div>
    );
}
