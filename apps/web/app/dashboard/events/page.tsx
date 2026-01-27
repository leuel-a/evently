import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {capitalizeFirstLetter} from '@/lib/utils';
import {Input} from '@/components/ui/input';

export default function Page() {
    return (
        <div>
            <div>
                <h1 className="text-lg">Events</h1>
            </div>
        </div>
    );
}

const categories = [
    'Conferences',
    'Workshops',
    'Webinars',
    'Networking Events',
    'Trade Shows',
    'Festivals',
    'Concerts',
    'Corporate Meetings',
    'Sports Events',
    'Social Gatherings',
];

export function FilterEvents() {
    return (
        <div>
            <div>
                <Input />
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {categories.map(category => (
                                <SelectItem value={category}>{capitalizeFirstLetter(category)}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
