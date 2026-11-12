import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventTicketCtaProps {
    href: string;
    isFree: boolean;
    isClosed: boolean;
    className?: string;
}

export function EventTicketCta(props: EventTicketCtaProps) {
    const {
        href,
        isFree,
        isClosed,
        className,
    } = props

    if (isClosed) {
        return (
            <Button size="lg" disabled className={className}>
                Sales ended
            </Button>
        );
    }

    return (
        <Button
            asChild
            size="lg"
            className={`bg-indigo-600 rounded text-white hover:bg-indigo-700 ${className ?? ''}`}
        >
            <NextLink href={href}>
                {isFree ? 'Reserve a spot' : 'Get tickets'}
                <ArrowRight className="size-4" />
            </NextLink>
        </Button>
    );
}
