import type {ControllerRenderProps, ControllerFieldState} from 'react-hook-form';
import {Field, FieldLabel, FieldError} from '@/components/ui/field';
import {cn} from '@/lib/utils';
import {
    AddressAutofillInput,
    type AddressAutofillInputProps,
} from '@/components/blocks/Common/AddressAutofillInput';
import type {EventSchemaType} from '@/lib/db/schema';

interface EventAddressInputProps {
    field: ControllerRenderProps<EventSchemaType, 'location'>;
    fieldState: ControllerFieldState;
    CustomAddressAutofillInputProps?: AddressAutofillInputProps;
}

export function EventLocationInput(props: EventAddressInputProps) {
    const {field, fieldState, CustomAddressAutofillInputProps = {}} = props;
    const {InputProps = {}, ...customAddressAutofillInputProps} = CustomAddressAutofillInputProps;
    const {className: inputClassName, ...inputProps} = InputProps;

    return (
        <Field>
            <FieldLabel>Address</FieldLabel>
            <AddressAutofillInput
                InputProps={{
                    className: cn('h-12', inputClassName),
                    'aria-invalid': fieldState.invalid,
                    ...inputProps,
                    ...field,
                }}
                {...customAddressAutofillInputProps}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}
