import worldCountries from 'world-countries';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';

const countries = worldCountries.map((country) => ({
    value: country.cca3,
    label: country.name.common,
}));

export function CountriesSelectInput({onChange, value}: CountriesSelectInputProps) {
    return (
        <Select
            onValueChange={onChange}
            value={value}
        >
            <SelectTrigger className="w-full rounded shadow-none focus-visible:ring-0 data-[size=default]:h-12">
                <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
                {countries.map(({value, label}) => (
                    <SelectItem
                        key={value}
                        value={value}
                    >
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export interface CountriesSelectInputProps {
    onChange: (value: string) => void;
    value: string;
}
