'use client';

import {useQuery} from '@tanstack/react-query';
import {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {APP_ROUTES} from '@/config/routes';
import {getEventsQuery} from '@/queries/eventCategory';

export function SelectEventCategory() {
    const router = useRouter();
    const params = useSearchParams();
    const {data: eventsCateogry} = useQuery({
        queryKey: ['events:select-event-category'],
        queryFn: getEventsQuery,
    });
    const filters: string[] = JSON.parse(params.get('categories') ?? '[]');
    const [selected, setSelected] = useState<string>('All');

    useEffect(() => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set('page', '1');
        if (selected === 'All') {
            newParams.delete('categories');
        } else {
            if (filters.includes(selected)) {
                newParams.set(
                    'categories',
                    JSON.stringify([...filters.filter((value) => value !== selected)]),
                );
            } else {
                newParams.set('categories', JSON.stringify([...filters, selected]));
            }
        }
        router.replace(`${APP_ROUTES.events.base}?${newParams.toString()}`);
    }, [selected]);

    return (
        <Select
            defaultValue={selected}
            value={selected}
            onValueChange={(value) => setSelected(value)}
        >
            <SelectTrigger className="bg-white rounded data-[size=default]:h-12">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {eventsCateogry &&
                    eventsCateogry.map((cateogry) => (
                        <SelectItem
                            key={cateogry.id}
                            value={cateogry.name}
                        >
                            {cateogry.name}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
}
