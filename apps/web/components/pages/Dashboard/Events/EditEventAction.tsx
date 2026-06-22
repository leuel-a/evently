import {useRouter} from 'next/navigation';
import {SquarePen} from 'lucide-react';
import type {Row} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {APP_ROUTES} from '@/config/routes';
import {IEvent} from '@/types/events';

interface EditEventActionProps {
    row: Row<IEvent>;
}

export function EditEventAction(props: EditEventActionProps) {
    const {row} = props;

    const router = useRouter();
    const handleClick = () => {
        router.push(`${APP_ROUTES.dashboard.events.edit}/${row.original.id}`);
    };

    return (
        <Button type="button" variant="outline" className="cursor-pointer" onClick={handleClick}>
            <SquarePen />
        </Button>
    );
}
