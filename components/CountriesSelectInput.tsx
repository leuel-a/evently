import worldCountries from 'world-countries';
import {useCreateEventFormContext} from '@/components/pages/dashboard/Form/Event/useCreateEventFormContext';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';
import {cn} from '@/lib/utils';

const countries = worldCountries.map((country) => ({
    value: country.cca3,
    label: country.name.common,
}));

export function CountriesSelectInput({onChange, value}: CountriesSelectInputProps) {
    const {getFieldState} = useCreateEventFormContext();
    const {error} = getFieldState('country');

    return (
        <Select
            onValueChange={onChange}
            value={value}
        >
            <SelectTrigger
                className={cn('w-full rounded shadow-none focus-visible:ring-0 data-[size=default]:h-12', error ? 'border border-red-500' : '')}
            >
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
