import {format} from 'date-fns';
import {MapPin, Calendar} from 'lucide-react';
import {Events} from '@/app/generated';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
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
        <div className="w-5/6 md:w-4/6 mx-auto">
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-medium tracking-tight">{event.title}</h1>
                <div className=" space-y-6">
                    <div>
                        <h2 className="text-sm">Description</h2>
                        <Separator className="my-2 mb-4" />
                        <p className="text-justify">{event.description}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                            <MapPin className="w-4 aspect-square" />
                            <span>{getEventAddress(event)}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Calendar className="w-4 aspect-square" />
                            <span>{getEventDate(event.date)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button className="h-12">Reserve Your Spot</Button>
                </div>
            </div>
        </div>
    );
}

function getEventDate(date: Date) {
    return format(new Date(date), 'MMMM dd, yyyy');
}

function getEventAddress(event: Events) {
    return event.isVirtual ? 'Remote' : event.address;
}
