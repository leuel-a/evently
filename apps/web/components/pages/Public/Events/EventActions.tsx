import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';
import { APP_ROUTES } from '@/config/routes';
import { Button } from '@/components/ui/button';
import { EVENT_STATUS } from '@evently/models/events/constants';

interface EventActionsProps {
    eventId: string;
    status: string;
    isDisabled: boolean;
}

export function EventActions(props: EventActionsProps) {
    const { eventId, status, isDisabled } = props;

    const detailsHref = `${APP_ROUTES.events.base}/${eventId}`;

    return (
        <div className="flex flex-col gap-1.5">
            <Button asChild size="sm" variant="outline" className="text-xs rounded">
                <NextLink href={detailsHref}>View Details</NextLink>
            </Button>

            {isDisabled ? (
                <Button size="sm" disabled className="text-xs rounded">
                    {status === EVENT_STATUS.CLOSED ? 'Closed' : 'Unavailable'}
                </Button>
            ) : (
                <Button
                    asChild
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded gap-1"
                >
                    <NextLink href={`${detailsHref}/checkout`}>
                        Get Tickets
                        <ArrowRight className="h-3 w-3" />
                    </NextLink>
                </Button>
            )}
        </div>
    );
}
