'use client';

import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import {Select, SelectContent, SelectTrigger, SelectItem} from '@/components/ui/select';
import {TICKET_STATUS} from '@/types/tickets';

export function SelectTicketStatus() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onValueChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === 'ALL') {
            params.set('status', '');
        } else {
            params.set('status', value);
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Select defaultValue="ALL" onValueChange={onValueChange}>
            <SelectTrigger className="h-8 w-35">Status</SelectTrigger>
            <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>

                {TICKET_STATUS.map((value) => (
                    <SelectItem key={value} value={value}>
                        {value}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
