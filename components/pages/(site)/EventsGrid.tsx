import {Events} from '@/app/generated/client';
import {EventCard} from './EventCard';

interface EventsGridProps {
    events: Array<Events>;
}

export function EventsGrid({events}: EventsGridProps) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                />
            ))}
        </div>
    );
}
