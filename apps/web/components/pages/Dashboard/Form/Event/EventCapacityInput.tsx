import type {ComponentProps} from 'react';
import {ControllerRenderProps, ControllerFieldState} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Field, FieldLabel, FieldError, FieldDescription} from '@/components/ui/field';
import type {EventSchemaType} from '@/lib/db/schema';

interface EventCapacityInputProps extends Omit<ComponentProps<typeof Input>, 'value' | 'onChange'> {
    field: ControllerRenderProps<EventSchemaType, 'capacity'>;
    fieldState: ControllerFieldState;
}

export function EventCapacityInput(props: EventCapacityInputProps) {
    const {field, fieldState, ...inputProps} = props;

    return (
        <Field className="flex-1">
            <FieldLabel>Capacity</FieldLabel>
            <Input
                type="number"
                placeholder="What is your expected attendance?"
                {...inputProps}
                {...field}
            />
            <FieldDescription>Maximum number of attendees</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}
