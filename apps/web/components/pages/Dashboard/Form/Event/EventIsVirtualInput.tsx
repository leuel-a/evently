import type {ControllerRenderProps, ControllerFieldState} from 'react-hook-form';
import {BooleanInput} from '@/components/blocks/BooleanInput';
import {Field, FieldLabel, FieldDescription, FieldError} from '@/components/ui/field';
import type {EventSchemaType} from '@/lib/db/schema';

interface EventIsVirtualInputProps {
    field: ControllerRenderProps<EventSchemaType, 'isVirtual'>;
    fieldState: ControllerFieldState;
}

export function EventIsVirtualInput(props: EventIsVirtualInputProps) {
    const {field, fieldState} = props;
    return (
        <Field
            data-invalid={fieldState.invalid}
            className="flex flex-row items-center justify-between rounded border p-3"
        >
            <div className="space-y-1">
                <FieldLabel>Virtual Event</FieldLabel>
                <FieldDescription>
                    Enable this if your event will be held online (virtual event).
                </FieldDescription>
            </div>
            <BooleanInput
                aria-invalid={fieldState.invalid}
                className="data-[state=checked]:bg-indigo-500"
                checked={field.value}
                onCheckedChange={field.onChange}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}
