import {ControllerFieldState, ControllerRenderProps} from 'react-hook-form';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {EventSchemaType} from '@/lib/db/schema';
import {Field, FieldLabel, FieldError} from '@/components/ui/field';
import {countries} from '@/utils/index';


interface CountriesSelectInputProps {
    field: ControllerRenderProps<EventSchemaType, 'country'>;
    fieldState: ControllerFieldState;
}

export function CountriesSelectInput(props: CountriesSelectInputProps) {
    const {fieldState, field} = props;
    
    return (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Country</FieldLabel>
            <Select  onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                    className="w-full rounded shadow-none focus-visible:ring-0 data-[size=default]:h-12"
                    aria-invalid={fieldState.invalid}
                >
                    <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                    {countries.map(({value, label}) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}
