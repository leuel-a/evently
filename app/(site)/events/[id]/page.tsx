import {EventDescriptionCard} from '@/components/pages/(site)';
import {ReserveYourSpotButton} from '@/components/pages/(site)';
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
            <EventDescriptionCard event={event} />
            <div className="w-full xl:max-w-md mx-auto bg-white shadow-lg rounded p-6 space-y-4">
                <h2 className="text-xl font-semibold">Reserve Your Spot</h2>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Event Ticket</span>
                        <span>$20</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>$20</span>
                    </div>
                </div>
                <ReserveYourSpotButton />
            </div>
        </div>
    );
}
