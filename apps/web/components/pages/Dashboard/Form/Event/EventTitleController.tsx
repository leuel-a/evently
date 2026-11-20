import { type Control, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import type { EventSchemaType } from '@/lib/db/schema';

interface EventTitleControllerProps {
    formControl: Control<EventSchemaType>
}

export function EventTitleController(props: EventTitleControllerProps) {
    const { formControl } = props;
    return (
        <Controller
            control={formControl}
            name="title"
            render={({ field, fieldState }) => (
                <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                        {...field}
                        className={cn('h-12 rounded border shadow-none')}
                        placeholder="Make the title slick 😉"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )

}
