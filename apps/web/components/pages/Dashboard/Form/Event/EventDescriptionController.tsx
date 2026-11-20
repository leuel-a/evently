import { Controller, type Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { EventSchemaType } from '@/lib/db/schema';
import { cn } from '@/lib/utils';

interface EventDescriptionControllerProps {
    formControl: Control<EventSchemaType>
}

export function EventDescriptionController(props: EventDescriptionControllerProps) {
    const { formControl } = props;
    return (
        <Controller
            control={formControl}
            name="description"
            render={({ field, fieldState }) => (
                <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                        {...field}
                        className={cn('h-32 rounded shadow-none')}
                        placeholder="Describe your event in detail"
                        rows={20}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}
