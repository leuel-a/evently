import {useQuery} from '@tanstack/react-query';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';
import {getEventsQuery} from '@/queries/eventCategory';

export function SelectEventCategory() {
    const {data: eventsCateogry} = useQuery({queryKey: ['events:select-event-category'], queryFn: getEventsQuery});

    return (
        <Select>
            <SelectTrigger className="rounded data-[size=default]:h-12">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {eventsCateogry &&
                    eventsCateogry.map((cateogry) => (
                        <SelectItem
                            key={cateogry.id}
                            value={cateogry.id}
                        >
                            {cateogry.name}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
}
