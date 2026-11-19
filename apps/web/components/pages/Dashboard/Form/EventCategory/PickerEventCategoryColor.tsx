import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { ColorPicker } from '@/components/blocks/Common';
import type { EventCategorySchemaType } from '@/lib/db/schema';
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';

interface EventCategoryColorPickerProps {
    field: ControllerRenderProps<EventCategorySchemaType, 'color'>
    fieldState: ControllerFieldState
}

export function EventCategoryColorPicker(props: EventCategoryColorPickerProps) {
    const { field, fieldState } = props;
    return (
        <Field>
            <FieldLabel>Color</FieldLabel>
            <ColorPicker {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )
}
