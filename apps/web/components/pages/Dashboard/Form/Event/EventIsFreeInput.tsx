import type {ControllerRenderProps, ControllerFieldState} from 'react-hook-form';
import {BooleanInput} from '@/components/blocks/BooleanInput';
import {Field, FieldLabel, FieldDescription, FieldError} from '@/components/ui/field';
import type {EventSchemaType} from '@/lib/db/schema';
import {cn} from '@/lib/utils';

interface EventIsFreeInputProps {
    field: ControllerRenderProps<EventSchemaType, 'isFree'>;
    fieldState: ControllerFieldState;
}

export function EventIsFreeInput(props: EventIsFreeInputProps) {
    const {field, fieldState} = props;
    return (
        <Field className="flex flex-row items-center justify-between rounded border p-3">
            <div className="space-y-1">
                <FieldLabel>Free Event</FieldLabel>
                <FieldDescription>No Charge for attendees</FieldDescription>
            </div>
            <BooleanInput
                aria-invalid={fieldState.invalid}
                className={cn("data-[state=checked]:bg-indigo-500")}
                checked={field.value}
                onCheckedChange={field.onChange}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}
