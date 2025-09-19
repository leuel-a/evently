import {Fragment} from 'react';
import {Events} from '@/app/generated/client';
import {EventDescriptionCard} from './EventDescriptionCard';
import {ReserveYourSpot} from './ReserveYourSpot';

interface EventPageContentProps {
    event: Events;
}

export function EventPageContent({event}: EventPageContentProps) {
    return (
        <Fragment>
            <EventDescriptionCard event={event} />
            <ReserveYourSpot event={event} />
        </Fragment>
    );
}
