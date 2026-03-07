import type {ComponentProps} from 'react';
import type {ControllerFieldState, ControllerRenderProps} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Field, FieldDescription, FieldError, FieldLabel} from '@/components/ui/field';
import type {EventSchemaType} from '@/lib/db/schema';

interface EventTicketPriceInputProps
    extends Omit<ComponentProps<typeof Input>, 'value' | 'onChange'> {
    field: ControllerRenderProps<EventSchemaType, 'ticketPrice'>;
    fieldState: ControllerFieldState;
}

export function EventTicketPriceInput(props: EventTicketPriceInputProps) {
    const {field, fieldState, ...inputProps} = props;

    return (
        <Field className="flex-1">
            <FieldLabel>Ticket Price</FieldLabel>
            <Input
                aria-invalid={fieldState.invalid}
                type="number"
                placeholder="What is your expected attendance?"
                {...field}
                {...inputProps}
            />
            <FieldDescription>Leave empty if event is free</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}
