import {Fragment} from 'react';
import {GetEventByIdReturn} from '@/app/(site)/actions';
import {Events} from '@/app/generated/client';
import {EventDescriptionCard} from './EventDescriptionCard';
import {ReserveYourSpot} from './ReserveYourSpot';

interface EventPageContentProps {
    event: NonNullable<GetEventByIdReturn['data']>;
}
export function EventPageContent({event}: EventPageContentProps) {
    return (
        <Fragment>
            <EventDescriptionCard event={event} />
            {!event.isFree && <ReserveYourSpot event={event} />}
        </Fragment>
    );
}
