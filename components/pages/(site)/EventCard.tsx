import {Laptop, MapPin} from 'lucide-react';
import Link from 'next/link';
import {Events} from '@/app/generated/client';
import {Button} from '@/components/ui/button';
import {APP_ROUTES} from '@/config/routes';

interface EventProps {
    event: Events;
}

export function Event(props: EventProps) {
    const {event} = props;

    return (
        <div className="border border-indigo-200 p-4 py-6 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-8">
                <h3 className="text-xl font-medium tracking-tight">{event.title}</h3>
                <p className="line-clamp-3">{event.description}</p>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    {event.isVirtual ? (
                        <>
                            <Laptop className="inline-block" />
                            <span className="text-sm ml-2">{'Remote'}</span>
                        </>
                    ) : (
                        <>
                            <MapPin className="inline-block" />
                            <span className="text-sm ml-2">{event.address}</span>
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <Button variant="default">Reserve Your Spot</Button>
                    <Button asChild variant="link" className="hidden">
                        <Link href={APP_ROUTES.index.home}>View Details</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
