import {Label} from '@/components/ui/label';
import {
    SelectItem,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from '@/components/ui/select';

interface ItemsPerPageProps {
    value: string;
    setValue: (value: string) => void;
}

export function ItemsPerPage({value, setValue}: ItemsPerPageProps) {
    return (
        <div className="bg-white py-1 px-4 border border-input flex">
            <Label>Items per Page</Label>
            <Select
                defaultValue={value}
                value={value}
                onValueChange={setValue}
            >
                <SelectTrigger className="w-[180px] rounded">
                    <SelectValue placeholder="Select page size" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
